const fs = require('fs');
const swaggerJsdoc = require("swagger-jsdoc");

const generateSwaggerFile = (path, swaggerConfig) => {
    fs.writeFileSync(path, JSON.stringify(swaggerJsdoc(swaggerConfig), null, 2));
}

module.exports = {
    generateSwaggerFile
}