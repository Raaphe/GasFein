const { config } = require('../configs/general.config');
const bcrypt = require('bcryptjs');
const { v5: uuidv5 } = require('uuid');
const jwt = require('jsonwebtoken');

/**
 * Hache un mot de passe en texte clair à l'aide de bcrypt.
 * @param {string} plainTextPassword - Le mot de passe à hacher.
 * @returns {Promise<string>} - Le mot de passe haché.
 */
const hashPassword = async (plainTextPassword) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(plainTextPassword, salt);
    } catch (error) {
        console.error('Erreur lors du hachage du mot de passe :', error);
        throw error;
    }
};

/**
 * Compare un mot de passe en texte clair avec un mot de passe haché à l'aide de bcrypt.
 * @param {string} plainTextPassword - Le mot de passe en texte clair.
 * @param {string} passwordHash - Le mot de passe haché à comparer.
 * @returns {Promise<boolean>} - Retourne true si les mots de passe correspondent, sinon false.
 */
const comparePassword = async (plainTextPassword, passwordHash) => {
    try {
        return await bcrypt.compare(plainTextPassword, passwordHash);
    } catch (error) {
        console.error('Erreur lors de la comparaison des mots de passe :', error);
        throw error;
    }
};

/**
 * Génère un identifiant unique pour une station à partir de son nom et de son adresse.
 * @param {string} stationName - Le nom de la station.
 * @param {string} address - L'adresse de la station.
 * @returns {string} - L'identifiant unique de la station.
 */
const generateUniqueStationId = (stationName, address) => {
    try {
        return uuidv5(`${stationName}-${address}`, uuidv5.DNS);
    } catch (error) {
        console.error('Erreur lors de la génération de l\'ID de la station :', error);
        throw error;
    }
};

/**
 * Compare un identifiant de station généré avec un identifiant fourni pour vérifier s'ils correspondent.
 * @param {string} stationName - Le nom de la station.
 * @param {string} address - L'adresse de la station.
 * @param {string} id - L'identifiant de la station à comparer.
 * @returns {boolean} - Retourne true si les identifiants correspondent, sinon false.
 */
const compareStationId = (stationName, address, id) => {
    try {
        return generateUniqueStationId(stationName, address) === id;
    } catch (error) {
        console.error('Erreur lors de la comparaison de l\'ID de la station :', error);
        return false;
    }
};

/**
 * Génère un JWT signé à partir des données fournies.
 * @param {Object} data - Les données à inclure dans le payload du token.
 * @returns {string} - Le JWT signé.
 */
const signJwt = (data) => {
    try {
        return jwt.sign({ data }, config.JWT_PRIVATE_KEY, { expiresIn: '1h' });
    } catch (error) {
        console.error('Erreur lors de la signature du JWT :', error);
        throw error;
    }
};

/**
 * Décodage et vérification d'un JWT à l'aide de la clé privée.
 * @param {string} token - Le JWT à décoder et vérifier.
 * @returns {Object} - Le payload décodé.
 */
const decodeJwt = (token) => {
    try {
        return jwt.verify(token, config.JWT_PRIVATE_KEY);
    } catch (error) {
        console.error('Erreur lors du décodage du JWT :', error);
        throw error;
    }
};

/**
 * Vérifie si un JWT est valide et non expiré.
 * @param {string} token - Le JWT à valider.
 * @returns {boolean} - Retourne true si le JWT est valide, sinon false.
 */
const isJwtValid = (token) => {
    try {
        jwt.verify(token, config.JWT_PRIVATE_KEY);
        return true;
    } catch (error) {
        console.error('Erreur lors de la validation du JWT :', error);
        return false;
    }
};

module.exports = {
    hashPassword,
    comparePassword,
    generateUniqueStationId,
    compareStationId,
    signJwt,
    decodeJwt,
    isJwtValid
};