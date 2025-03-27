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
    },
  },
  apis: ['./app/Controllers/Http/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;