const bcrypt = require('bcryptjs');
const { v5: uuidv5 } = require('uuid');

/**
 * Hashes the plain text password using bcrypt.
 * @param {string} plainTextPassword - The password to be hashed.
 * @returns {Promise<string>} - The hashed password.
 */
const hashPassword = async (plainTextPassword) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(plainTextPassword, salt);
    } catch (error) {
        console.error('Error while hashing password:', error);
        throw error;
    }
};

/**
 * Compares a plain text password with a hashed password.
 * @param {string} plainTextPassword - The plain text password.
 * @param {string} passwordHash - The hashed password to compare against.
 * @returns {Promise<boolean>} - Returns true if the passwords match, otherwise false.
 */
const comparePassword = async (plainTextPassword, passwordHash) => {
    try {
        return await bcrypt.compare(plainTextPassword, passwordHash);
    } catch (error) {
        console.error('Error while comparing passwords:', error);
        throw error;
    }
};

/**
 * Generates a unique station ID using the station name and address.
 * @param {string} stationName - The name of the station.
 * @param {string} address - The address of the station.
 * @returns {string} - The unique station ID.
 */
const generateUniqueStationId = (stationName, address) => {
    try {
        return uuidv5(`${stationName}-${address}`, uuidv5.DNS);
    } catch (error) {
        console.error('Error while generating station ID:', error);
        throw error;
    }
};

/**
 * Compares a station ID generated from station name and address with the provided ID.
 * @param {string} stationName - The name of the station.
 * @param {string} address - The address of the station.
 * @param {string} id - The station ID to compare against.
 * @returns {boolean} - Returns true if the generated station ID matches the provided ID, otherwise false.
 */
const compareStationId = (stationName, address, id) => {
    try {
        return generateUniqueStationId(stationName, address) === id;
    } catch (error) {
        console.error('Error while comparing station ID:', error);
        return false;
    }
};

module.exports = { 
    hashPassword, 
    comparePassword, 
    generateUniqueStationId, 
    compareStationId 
};