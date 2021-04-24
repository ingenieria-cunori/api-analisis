import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  IsolationLevel,
  repository,
  Transaction,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param,
  patch, post,
  put,
  requestBody
} from '@loopback/rest';
import {ObjetoPersona, Persona, Telefono} from '../models';
import {PersonaRepository, TelefonoRepository} from '../repositories';

export class PersonaController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
    @repository(TelefonoRepository)
    public telefonoRepository: TelefonoRepository
  ) { }
  /*
    @post('/personas', {
      responses: {
        '200': {
          description: 'Persona model instance',
          content: {'application/json': {schema: getModelSchemaRef(Persona)}},
        },
      },
    })
    async create(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Persona, {
              title: 'NewPersona',
              exclude: ['idpersona'],
            }),
          },
        },
      })
      persona: Omit<Persona, 'idpersona'>,
    ): Promise<Persona> {
      return this.personaRepository.create(persona);
    }*/

  @post('/personastelefonos', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(ObjetoPersona)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ObjetoPersona, {
            title: 'NewPersona',
            exclude: ['idpersona'],
          }),
        },
      },
    })
    persona: Omit<ObjetoPersona, 'idpersona'>,
  ): Promise<ObjetoPersona> {
    let res: ObjetoPersona = new ObjetoPersona
    let p: Persona = new Persona
    let rp: Persona
    //Inicializando la transacción
    const tx: Transaction = await this.personaRepository.beginTransaction({
      isolationLevel: IsolationLevel.SERIALIZABLE,
      timeout: 30000, // 30000ms = 30s
    });
    try {
      p.nombre = persona.nombre
      p.genero = persona.genero
      //Crear el registro de la persona
      rp = await this.personaRepository.create(p, {transaction: tx})
      //Crear los telefonos de la persona
      let tel: Telefono = new Telefono
      for (const x in persona._telefonos) {
        tel.numero = persona._telefonos[x]
        tel.idpersona = Number(rp.idpersona)
        await this.telefonoRepository.create(tel, {transaction: tx})
      }
      //commit a la transacción
      await tx.commit()
      res.idpersona = rp.idpersona
      res.nombre = rp.nombre
      res.genero = rp.genero
      res._telefonos = persona._telefonos
    } catch (error) {
      await tx.rollback()
      throw new HttpErrors.UnprocessableEntity(error)
    }
    return res
  }

  @get('/personas/count', {
    responses: {
      '200': {
        description: 'Persona model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.count(where);
  }

  @get('/personas', {
    responses: {
      '200': {
        description: 'Array of Persona model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Persona, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Persona) filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.personaRepository.find(filter);
  }

  @patch('/personas', {
    responses: {
      '200': {
        description: 'Persona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.updateAll(persona, where);
  }

  @get('/personas/{id}', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Persona, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Persona, {exclude: 'where'}) filter?: FilterExcludingWhere<Persona>
  ): Promise<Persona> {
    return this.personaRepository.findById(id, filter);
  }

  @patch('/personas/{id}', {
    responses: {
      '204': {
        description: 'Persona PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
  ): Promise<void> {
    await this.personaRepository.updateById(id, persona);
  }

  @put('/personas/{id}', {
    responses: {
      '204': {
        description: 'Persona PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() persona: Persona,
  ): Promise<void> {
    await this.personaRepository.replaceById(id, persona);
  }

  @del('/personas/{id}', {
    responses: {
      '204': {
        description: 'Persona DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.personaRepository.deleteById(id);
  }
}
