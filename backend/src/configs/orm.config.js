const { config } = require('./general.config.js');
const { DataSource } = require('typeorm');
const path = require('path');

const isDev = config.ENV === 'development';

let dataSourceInstance = null;

/**
 * Creates and configures the data source for the application.
 * @returns {DataSource} The configured DataSource instance.
 */
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

/**
 * Initializes the data source connection if not already initialized.
 * @throws {Error} If there is an error during data source initialization.
 * @returns {DataSource} The initialized DataSource instance.
 */
const connectToDataSource = async () => {
  if (!dataSourceInstance) {
    try {
      const dataSource = createDataSource();
      await dataSource.initialize();
      dataSourceInstance = dataSource;
    } catch (err) {
      console.error("Error during Data Source initialization:", err);
      throw err;
    }
  }
  return dataSourceInstance;
};

/**
 * Retrieves the initialized data source instance.
 * @throws {Error} If the data source is not initialized.
 * @returns {DataSource} The initialized DataSource instance.
 */
const getDataSource = () => {
  if (!dataSourceInstance) {
    throw new Error('DataSource is not initialized. Call connectToDataSource first.');
  }
  return dataSourceInstance;
};

module.exports = { 
  connectToDataSource, 
  getDataSource 
};