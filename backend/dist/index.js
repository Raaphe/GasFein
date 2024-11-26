"use strict";

var express = require('express');
var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');
var _require = require('./configs/general.config.js'),
  config = _require.config;
var _require2 = require('./configs/db.config.js'),
  connectToDataSource = _require2.connectToDataSource;
var _require3 = require('./configs/swagger.config.js'),
  swaggerOptions = _require3.swaggerOptions;
require('reflect-metadata');
var app = express();
app.use(express.json());
var swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("".concat(config.BASE_PATH, "/docs"), swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get("".concat(config.BASE_PATH, "/docs.json"), function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});
app.get('/', function (req, res) {
  return res.redirect("".concat(config.BASE_PATH, "/docs"));
});
connectToDataSource().then(function (dataSource) {
  app.listen(config.PORT, function () {
    return console.log("Server is running on http://localhost:".concat(config.PORT));
  });
})["catch"](function (err) {
  return console.error('Failed to connect to the database', err);
});