import {DefaultCrudRepository} from '@loopback/repository';
import {Telefono, TelefonoRelations} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TelefonoRepository extends DefaultCrudRepository<
  Telefono,
  typeof Telefono.prototype.idtelefono,
  TelefonoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Telefono, dataSource);
  }
}
