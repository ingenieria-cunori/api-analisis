import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {
      table: 'persona'
    }
  }
})
export class Persona extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idpersona?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  genero: string;


  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
}

export type PersonaWithRelations = Persona & PersonaRelations;
