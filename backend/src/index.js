const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { config } = require('./configs/general.config.js');
const { connectToDataSource } = require('./configs/db.config.js');
const { swaggerOptions } = require('./configs/swagger.config.js');
require('reflect-metadata');

const app = express();
app.use(express.json());

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(`${config.BASE_PATH}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get(`${config.BASE_PATH}/docs.json`, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});

app.get('/', (req, res) => res.redirect(`${config.BASE_PATH}/docs`));

connectToDataSource()
  .then((dataSource) => {
    app.listen(config.PORT, () => 
      console.log(`Server is running on http://localhost:${config.PORT}`)
    )
  })
  .catch((err) => console.error('Failed to connect to the database', err));