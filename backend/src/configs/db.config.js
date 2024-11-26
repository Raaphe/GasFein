const { config } = require('./general.config.js');
const { DataSource } = require('typeorm');
const path = require('path');

const isDev = config.ENV === 'development';

const createDataSource = () => {
  return new DataSource({
    type: isDev ? 'sqlite' : 'mysql',
    host: isDev ? undefined : config.DB_HOST,
    port: isDev ? undefined : parseInt(config.DB_PORT, 10),
    username: isDev ? undefined : config.DB_USERNAME,
    password: isDev ? undefined : config.DB_PASSWORD,
    database: isDev ? ':memory:' : config.DB_NAME,
    synchronize: isDev, 
    logging: true,
    entities: [path.join(__dirname, '../models/*.model.js')],
    migrations: [],
    subscribers: [],
  });
};


const connectToDataSource = async () => {
  const dataSource = createDataSource();
  try {
    await dataSource.initialize();
    console.log("\n\nData Source has been initialized!");
    return dataSource;
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    throw err;
  }
};

module.exports = { connectToDataSource, createDataSource };