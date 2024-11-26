const { config } = require('./general.config.js');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "GasFein API",
      version: '1.0.0',
      description: 'This is the official API of GasFein',
      license: {
        name: 'Apache-2.0 license',
        url: 'https://www.apache.org/licenses/LICENSE-2.0',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
        description: 'Development server (HTTP)',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.route.js'],
};

module.exports = { swaggerOptions };