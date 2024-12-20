const dotenv = require('dotenv');

dotenv.config();

/**
 * @namespace Config Generaux
 * @description Fournit les donnes generaux necessaires de l'application.
 */

/**
 * Configuration de l'application.
 * Charge et fournit les paramètres essentiels de l'application,
 * notamment les paramètres du serveur et les détails de la base de données.
 */
const config = {
  /**
   * Port sur lequel l'application écoute.
   * Défini par la variable d'environnement `PORT`, sinon utilise 3000 par défaut.
   * @type {number}
   */
  PORT: process.env.PORT || 3000,

  /**
   * Environnement d'exécution de l'application.
   * Peut être 'development', 'production' ou 'test'.
   * Défini par la variable d'environnement `NODE_ENV`, sinon 'development' par défaut.
   * @type {string}
   */
  ENV: process.env.NODE_ENV || 'development',

  /**
   * Chemin de base pour les routes de l'API.
   * Défini par la variable d'environnement `BASE_PATH`, sinon '/api/v1' par défaut.
   * @type {string}
   */
  BASE_PATH: process.env.BASE_PATH || '/api/v1',

  /**
   * Hôte de la base de données.
   * Défini par la variable d'environnement `DB_HOST`, sinon 'localhost' par défaut.
   * @type {string}
   */
  DB_HOST: process.env.DB_HOST || 'localhost',

  /**
   * Port utilisé pour se connecter à la base de données.
   * Défini par la variable d'environnement `DB_PORT`, sinon 3306 par défaut.
   * @type {number}
   */
  DB_PORT: process.env.DB_PORT || 3306,

  /**
   * Nom d'utilisateur pour la base de données.
   * Défini par la variable d'environnement `DB_USERNAME`, sinon 'root' par défaut.
   * @type {string}
   */
  DB_USERNAME: process.env.DB_USERNAME || 'root',

  /**
   * Mot de passe pour la base de données.
   * Défini par la variable d'environnement `DB_PASSWORD`, sinon 'abc-123' par défaut.
   * @type {string}
   */
  DB_PASSWORD: process.env.DB_PASSWORD || 'abc-123',

  /**
   * Nom de la base de données.
   * Défini par la variable d'environnement `DB_NAME`, sinon 'testdb' par défaut.
   * @type {string}
   */
  DB_NAME: process.env.DB_NAME || 'testdb',

  /**
   * Clé privée utilisée pour signer les JSON Web Tokens (JWT).
   * Définie par la variable d'environnement `JWT_PRIVATE_KEY`, sinon 'abc-123' par défaut.
   * @type {string}
   */
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY || 'abc-123',

  /**
   * Token GAsFein
   * @type {number}
   */
  GASFEIN_TKN: process.env.GASFEIN_TOKEN || "",

};

module.exports = { config };