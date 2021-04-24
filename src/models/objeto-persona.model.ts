import {property} from '@loopback/repository';
import {Persona} from './persona.model';


export class ObjetoPersona extends Persona {
  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  _telefonos: number[];


  constructor(data?: Partial<ObjetoPersona>) {
    super(data);
  }
}

export interface ObjetoPersonaRelations {
  // describe navigational properties here
}

export type ObjetoPersonaWithRelations = ObjetoPersona & ObjetoPersonaRelations;
