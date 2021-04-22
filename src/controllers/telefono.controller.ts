import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Telefono} from '../models';
import {TelefonoRepository} from '../repositories';

export class TelefonoController {
  constructor(
    @repository(TelefonoRepository)
    public telefonoRepository : TelefonoRepository,
  ) {}

  @post('/telefonos', {
    responses: {
      '200': {
        description: 'Telefono model instance',
        content: {'application/json': {schema: getModelSchemaRef(Telefono)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Telefono, {
            title: 'NewTelefono',
            exclude: ['idtelefono'],
          }),
        },
      },
    })
    telefono: Omit<Telefono, 'idtelefono'>,
  ): Promise<Telefono> {
    return this.telefonoRepository.create(telefono);
  }

  @get('/telefonos/count', {
    responses: {
      '200': {
        description: 'Telefono model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Telefono) where?: Where<Telefono>,
  ): Promise<Count> {
    return this.telefonoRepository.count(where);
  }

  @get('/telefonos', {
    responses: {
      '200': {
        description: 'Array of Telefono model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Telefono, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Telefono) filter?: Filter<Telefono>,
  ): Promise<Telefono[]> {
    return this.telefonoRepository.find(filter);
  }

  @patch('/telefonos', {
    responses: {
      '200': {
        description: 'Telefono PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Telefono, {partial: true}),
        },
      },
    })
    telefono: Telefono,
    @param.where(Telefono) where?: Where<Telefono>,
  ): Promise<Count> {
    return this.telefonoRepository.updateAll(telefono, where);
  }

  @get('/telefonos/{id}', {
    responses: {
      '200': {
        description: 'Telefono model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Telefono, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Telefono, {exclude: 'where'}) filter?: FilterExcludingWhere<Telefono>
  ): Promise<Telefono> {
    return this.telefonoRepository.findById(id, filter);
  }

  @patch('/telefonos/{id}', {
    responses: {
      '204': {
        description: 'Telefono PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Telefono, {partial: true}),
        },
      },
    })
    telefono: Telefono,
  ): Promise<void> {
    await this.telefonoRepository.updateById(id, telefono);
  }

  @put('/telefonos/{id}', {
    responses: {
      '204': {
        description: 'Telefono PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() telefono: Telefono,
  ): Promise<void> {
    await this.telefonoRepository.replaceById(id, telefono);
  }

  @del('/telefonos/{id}', {
    responses: {
      '204': {
        description: 'Telefono DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.telefonoRepository.deleteById(id);
  }
}
