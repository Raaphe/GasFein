"use strict";

var dotenv = require('dotenv');
dotenv.config();
var config = {
  PORT: process.env.PORT || 3000,
  ENV: process.env.NODE_ENV || 'development',
  BASE_PATH: process.env.BASE_PATH || '/api/v1',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 3306,
  DB_USERNAME: process.env.DB_USERNAME || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'abc-123',
  DB_NAME: process.env.DB_NAME || 'testdb'
};
module.exports = {
  config: config
};