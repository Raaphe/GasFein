const { getDataSource } = require('../configs/orm.config');
const { User } = require('../models/user.model');
const { Station } = require('../models/station.model');
const { Car, FuelType } = require('../models/car.model');
const { hashPassword, comparePassword, signJwt, decodeJwt, isJwtValid } = require('../utils/security.util');

/**
 * Service pour la gestion des utilisateurs.
 * Fournit des méthodes pour créer, récupérer, mettre à jour et supprimer des utilisateurs,
 * ainsi que pour gérer leurs stations et voitures associées.
 */
class UserService {
    /**
     * Initialise les repositories pour l'accès aux données des utilisateurs, stations et voitures.
     */
    constructor() {
        const dataSource = getDataSource();
        this.userRepository = dataSource.getRepository(User);
        this.stationRepository = dataSource.getRepository(Station);
        this.carRepository = dataSource.getRepository(Car);
    }

    /**
     * Récupère un utilisateur par son identifiant.
     * Lance une erreur si l'utilisateur n'est pas trouvé.
     * @param {number} userId - L'identifiant de l'utilisateur.
     * @returns {Promise<User>} - L'utilisateur trouvé.
     */
    fetchUser = async (userId) => {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['cars', 'stations'],
        });

        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }

        user.password_hash = "";

        return user;
    }

    /**
     * Récupère un utilisateur en utilisant son adresse e-mail et son mot de passe.
     * @param {string} email - L'adresse e-mail de l'utilisateur.
     * @param {string} password - Le mot de passe de l'utilisateur à vérifier.
     * @returns {Promise<User|null>} - L'utilisateur trouvé avec ses voitures et stations, ou null si l'utilisateur n'existe pas ou si le mot de passe est incorrect.
     */
    fetchUserByEmailAndPassword = async (email, password) => {
        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['cars', 'stations'],
        });

        if (!user || !(await comparePassword(password, user.password_hash))) {
            return null;
        }

        return { ...user, jwt: signJwt(user.id) };
    };

    /**
     * Récupère un utilisateur en utilisant un JSON Web Token (JWT).
     * @param {string} jwt - Le JWT de l'utilisateur à valider.
     * @returns {Promise<User|null>} - L'utilisateur trouvé ou null si le JWT est invalide ou manquant.
     */
    fetchUserByJwt = async (jwt) => {
        if (!jwt || !isJwtValid(jwt)) {
            return null;
        }

        return this.fetchUser(decodeJwt(jwt).data);
    };

    /**
     * Crée un nouvel utilisateur et retourne l'utilisateur créé.
     * @param {string} firstName - Le prénom de l'utilisateur.
     * @param {string} lastName - Le nom de famille de l'utilisateur.
     * @param {string} email - L'adresse e-mail de l'utilisateur.
     * @param {string} password - Le mot de passe de l'utilisateur.
     * @param {string} profileImage - L'image de profil de l'utilisateur.
     * @returns {Promise<User>} - L'utilisateur créé.
     */
    createUser = async (firstName, lastName, email, password, profileImage) => {
        try {
            const newUser = this.userRepository.create({
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                profile_image: profileImage,
            });

            newUser.password_hash = await hashPassword(password);

            const savedUser = await this.userRepository.save(newUser);
            savedUser.password_hash = "";

            return {...savedUser, jwt: signJwt(savedUser.id)};
        } catch (error) {
            console.error('Erreur lors de la création de l’utilisateur:', error.message);
            throw new Error('Impossible de créer l’utilisateur');
        }
    }

    /**
     * Met à jour les informations d'un utilisateur et retourne l'utilisateur mis à jour.
     * @param {number} userId - L'identifiant de l'utilisateur.
     * @param {object} updates - Les champs à mettre à jour.
     * @returns {Promise<User>} - L'utilisateur mis à jour.
     */
    updateUser = async (userId, updates) => {
        try {
            const user = await this.fetchUser(userId);
            if (updates.firstName) user.first_name = updates.firstName;
            if (updates.lastName) user.last_name = updates.lastName;
            if (updates.email) user.email = updates.email;
            if (updates.password) user.password_hash = await hashPassword(updates.password);
            if (updates.profileImage) user.profile_image = updates.profileImage;

            return await this.userRepository.save(user);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l’utilisateur:', error);
            throw new Error('Impossible de mettre à jour l’utilisateur');
        }
    }

    /**
     * Supprime un utilisateur par son identifiant.
     * @param {number} userId - L'identifiant de l'utilisateur.
     * @returns {Promise<boolean>} - True si l'utilisateur a été supprimé, sinon False.
     */
    deleteUser = async (userId) => {
        const user = await this.fetchUser(userId);
        return await this.userRepository.remove(user) !== null;
    }

    /**
     * Ajoute une station à la liste d'un utilisateur.
     * @param {number} userId - L'identifiant de l'utilisateur.
     * @param {string} stationName - Le nom de la station.
     * @param {string} address - L'adresse de la station.
     * @param price
     * @returns {Promise<any[]>} - La station ajoutée.
     */
    addStationToUser = async (userId, stationName, address, price) => {
        const user = await this.fetchUser(userId);
        const newStation = this.stationRepository.create({
            station_name: stationName,
            address,
            price,
            user,
        });
        return await this.stationRepository.save(newStation);
    }

    /**
     * Supprime une station de la liste d'un utilisateur.
     * @param {number} userId - L'identifiant de l'utilisateur.
     * @param {number} stationId - L'identifiant de la station à supprimer.
     * @returns {Promise<boolean>} - True si la station a été supprimée, sinon False.
     */
    deleteStationFromUser = async (userId, stationId) => {
        try {
            const user = await this.fetchUser(userId);
            const updatedStations = user.stations.filter(station => station.id !== stationId);

            if (updatedStations.length === user.stations.length) {
                throw new Error('Station introuvable');
            }

            user.stations = updatedStations;
            await this.userRepository.save(user);
            return true;
        } catch (error) {
            console.error('Erreur lors de la suppression de la station:', error.message);
            throw new Error('Échec de la suppression de la station');
        }
    }

    /**
     * Ajoute une voiture à la liste d'un utilisateur.
     * @param {number} userId - L'identifiant de l'utilisateur.
     * @param {string} make - La marque de la voiture.
     * @param {string} model - Le modèle de la voiture.
     * @param {number} year - L'année de la voiture.
     * @param {string} color - La couleur de la voiture.
     * @param {FuelType} fuelType - Le type de carburant (par défaut: FuelType.GASOLINE).
     * @returns {Promise<Car>} - La voiture ajoutée.
     */
    addCarToUser = async (userId, make, model, year, color, fuelType = FuelType.GASOLINE) => {
        const user = await this.fetchUser(userId);
        const newCar = this.carRepository.create({
            make,
            model,
            year,
            color,
            fuel_type: fuelType,
            user,
        });
        return await this.carRepository.save(newCar);
    }

    /**
     * Supprime une voiture de la liste d'un utilisateur.
     * @param {number} userId - L'identifiant de l'utilisateur.
     * @param {string} carId - L'identifiant de la voiture à supprimer.
     * @returns {Promise<boolean>} - True si la voiture a été supprimée, sinon False.
     */
    deleteCarFromUser = async (userId, carId) => {
        try {
            const user = await this.fetchUser(userId);
            const updatedCars = user.cars.filter(car => car.id !== carId);

            if (updatedCars.length === user.cars.length) {
                throw new Error('Voiture introuvable');
            }

            user.cars = updatedCars;
            await this.userRepository.save(user);
            return true;
        } catch (error) {
            console.error('Erreur lors de la suppression de la voiture:', error.message);
            throw new Error('Échec de la suppression de la voiture');
        }
    }

    /**
     * Récupère toutes les voitures associées à un utilisateur.
     * @param {number} userId - L'identifiant de l'utilisateur.
     * @returns {Promise<Car[]>} - Une liste des voitures associées à l'utilisateur.
     */
    getCarsByUser = async (userId) => {
        const user = await this.fetchUser(userId);
        return user.cars;
    }

    /**
     * Récupère toutes les stations associées à un utilisateur.
     * @param {number} userId - L'identifiant de l'utilisateur.
     * @returns {Promise<Station[]>} - Une liste des stations associées à l'utilisateur.
     * @code
     */
    getStationsByUser = async (userId) => {
        const user = await this.fetchUser(userId);
        return user.stations;
    }
}

module.exports = {
    UserService
};