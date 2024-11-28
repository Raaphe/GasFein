const { connectToDataSource } = require('./configs/orm.config.js');
const { config } = require('./configs/general.config.js');
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { swaggerOptions } = require('./configs/swagger.config.js');
const userRoutes = require('./routes/user.route.js');
const gasRoutes = require('./routes/gas.route.js');
const authRoutes = require('./routes/auth.route.js');
require('reflect-metadata');

const app = express();
app.use(express.json());

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use(`${config.BASE_PATH}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get(`${config.BASE_PATH}/docs.json`, (req, res) => res.json(swaggerDocs));

app.get('/', (req, res) => res.redirect(`${config.BASE_PATH}/docs`));

connectToDataSource()
  .then(() => {
    console.log("\n\nData Source has been initialized!");
    app.use('/api', userRoutes);
    app.use('/api', gasRoutes);
    app.use('/api', authRoutes);


    app.listen(config.PORT, () => {
      console.log(`Server is running on http://localhost:${config.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });