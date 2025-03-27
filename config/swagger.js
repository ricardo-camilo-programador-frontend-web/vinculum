const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vinculum API',
      version: '1.0.0',
      description: 'Documentação da API do Vinculum',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Category: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            nome: {
              type: 'string'
            },
            created_at: {
              type: 'string',
              format: 'date-time'
            },
            updated_at: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Product: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            nome: {
              type: 'string'
            },
            descricao: {
              type: 'string'
            },
            preco: {
              type: 'number',
              format: 'float'
            },
            created_at: {
              type: 'string',
              format: 'date-time'
            },
            updated_at: {
              type: 'string',
              format: 'date-time'
            }
          }
        }
      }
    },
  },
  apis: ['./app/Controllers/Http/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;