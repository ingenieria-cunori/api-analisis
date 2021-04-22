import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {
      table: 'telefono'
    }
  }
})
export class Telefono extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idtelefono?: number;

  @property({
    type: 'number',
    required: true,
  })
  numero: number;

  @property({
    type: 'number',
    required: true,
  })
  idpersona: number;


  constructor(data?: Partial<Telefono>) {
    super(data);
  }
}

export interface TelefonoRelations {
  // describe navigational properties here
}

export type TelefonoWithRelations = Telefono & TelefonoRelations;
