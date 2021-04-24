import {Getter, inject} from '@loopback/core';
import {DefaultTransactionalRepository, HasManyRepositoryFactory, juggler, repository} from '@loopback/repository';
import {Persona, PersonaRelations, Telefono} from '../models';
import {TelefonoRepository} from './telefono.repository';

export class PersonaRepository extends DefaultTransactionalRepository<
  Persona,
  typeof Persona.prototype.idpersona,
  PersonaRelations
> {
  public readonly telefonos: HasManyRepositoryFactory<
    Telefono,
    typeof Telefono.prototype.idpersona
  >;
  constructor(
    @inject('datasources.mysql') protected db: juggler.DataSource,
    @repository.getter('TelefonoRepository')
    telefonoRepositoryGetter: Getter<TelefonoRepository>,
  ) {
    super(Persona, db);
    this.telefonos = this.createHasManyRepositoryFactoryFor(
      'telefonos',
      telefonoRepositoryGetter,
    );

    // add this line to register inclusion resolver
    this.registerInclusionResolver('telefonos', this.telefonos.inclusionResolver);
  }
}
