const cors = require('cors');
const { connectToDataSource } = require('./configs/orm.config.js');
const { config } = require('./configs/general.config.js');
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { swaggerOptions } = require('./configs/swagger.config.js');
const { generateSwaggerFile } = require("./utils/file.util");
require('reflect-metadata');

const userRoutes = require('./routes/user.route.js');
const gasApiRoutes = require('./routes/gas-api.route.js');
const mapRoutes = require('./routes/map.route')

const app = express();
app.use(express.json());
app.use(cors());
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use(`${config.BASE_PATH}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get(`${config.BASE_PATH}/docs.json`, (req, res) => res.json(swaggerDocs));
generateSwaggerFile('../docs/swagger/swagger.json', swaggerOptions);

app.get('/', (req, res) => res.redirect(`${config.BASE_PATH}/docs`));

connectToDataSource()
    .then(() => {
        console.log("\n\nData Source has been initialized!");

        app.use(`${config.BASE_PATH}`, userRoutes);
        app.use(`${config.BASE_PATH}`, gasApiRoutes);
        app.use(`${config.BASE_PATH}`, mapRoutes);
        console.log(config.PORT);
        app.listen(Number(config.PORT), "0.0.0.0", async () => {
            if (config.ENV === 'development') {
                console.log(`Server is running on http://${config.PRIVATE_LOCAL_IP}:${config.PORT}`);
            } else if (config.ENV === 'production') {
                console.log(`Server is running on https://gasfein.onrender.com`);
            }
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });