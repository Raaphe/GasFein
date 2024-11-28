const { config } = require('./general.config.js');
const { DataSource } = require('typeorm');
const path = require('path');

/**
 * @namespace ORM
 * @description Fournit des utilitaires pour gérer la connexion à la source de données.
 */

/**
 * Indique si l'environnement est en mode développement.
 * @memberof ORM
 * @type {boolean}
 */
const isDev = config.ENV === 'development';

/**
 * Instance unique de la source de données, utilisée pour éviter les connexions multiples.
 * @memberof ORM
 * @type {DataSource|null}
 */
let dataSourceInstance = null;

/**
 * Crée et configure la source de données pour l'application.
 * @function createDataSource
 * @memberof ORM
 *
 * @returns {DataSource} Une instance de DataSource configurée.
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
 * Initialise la connexion à la source de données si elle n'est pas déjà initialisée.
 * @function connectToDataSource
 * @memberof ORM
 *
 * @throws {Error} Si une erreur survient lors de l'initialisation.
 * @returns {DataSource} L'instance initialisée de DataSource.
 */
const connectToDataSource = async () => {
  if (!dataSourceInstance) {
    try {
      const dataSource = createDataSource();
      await dataSource.initialize();
      dataSourceInstance = dataSource;
    } catch (err) {
      console.error("Erreur lors de l'initialisation de la source de données :", err);
      throw err;
    }
  }
  return dataSourceInstance;
};

/**
 * Récupère l'instance initialisée de la source de données.
 * @function getDataSource
 * @memberof ORM
 *
 * @throws {Error} Si la source de données n'est pas initialisée.
 * @returns {DataSource} L'instance initialisée de DataSource.
 */
const getDataSource = () => {
  if (!dataSourceInstance) {
    throw new Error('La source de données n’est pas initialisée. Appelez d’abord connectToDataSource.');
  }
  return dataSourceInstance;
};

module.exports = {
  connectToDataSource,
  getDataSource
};