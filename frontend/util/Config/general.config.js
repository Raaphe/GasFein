import Constants from "expo-constants"

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
   * Token pour s'authentifier pour le trajet
   * @type {String}
   */
  GASFEIN_TOKEN: Constants.expoConfig.extra.GASFEIN_TOKEN,

  /**
   * Backend's IP.
   * @type {String}
   */
  BACKEND_IP: Constants.expoConfig.extra.BACKEND_IP,

};

module.exports = { config };