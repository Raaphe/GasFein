const { getDataSource } = require('../configs/orm.config');
const { User } = require('../models/user.model');
const { Station } = require('../models/station.model');
const { Car, FuelType } = require('../models/car.model');
const { hashPassword } = require('../utils/security.util');

class UserService {
    constructor() {
        const dataSource = getDataSource();
        this.userRepository = dataSource.getRepository(User);
        this.stationRepository = dataSource.getRepository(Station);
        this.carRepository = dataSource.getRepository(Car);
    }

    /**
     * Fetches a user by ID. Throws an error if the user is not found.
     * @param {number} userId - The user's ID.
     * @returns {Promise<User>} - The user object.
     */
    async fetchUser(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['cars', 'stations'],
        });
        if (!user) throw new Error('User not found');
        return user;
    }

    /**
     * Creates a new user and returns the created user.
     * @param {object} userDetails - The user data.
     * @returns {Promise<User>} - The created user object.
     */
    async createUser(firstName, lastName, email, password, profileImage) {
        try {
            const newUser = this.userRepository.create({
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                profile_image: profileImage,
            });

            newUser.password_hash = await hashPassword(password);
            return await this.userRepository.save(newUser);
        } catch (error) {
            console.error('Error creating user:', error.message);
            throw new Error('Unable to create user');
        }
    }

    /**
     * Updates a user's details and returns the updated user.
     * @param {number} userId - The user's ID.
     * @param {object} updates - Fields to update.
     * @returns {Promise<User>} - The updated user object.
     */
    async updateUser(userId, updates) {
        try {
            const user = await this.fetchUser(userId);
            if (updates.firstName) user.first_name = updates.firstName;
            if (updates.lastName) user.last_name = updates.lastName;
            if (updates.email) user.email = updates.email;
            if (updates.password) user.password_hash = await hashPassword(updates.password);
            if (updates.profileImage) user.profile_image = updates.profileImage;

            return await this.userRepository.save(user);
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Failed to update user');
        }
    }

    /**
     * Deletes a user by ID.
     * @param {number} userId - The user's ID.
     * @returns {Promise<boolean>} - True if the user was deleted, otherwise false.
     */
    async deleteUser(userId) {
        const user = await this.fetchUser(userId);
        return await this.userRepository.remove(user) !== null;
    }

    /**
     * Adds a station to a user's list.
     * @param {number} userId - The user's ID.
     * @param {object} stationDetails - The station data.
     * @returns {Promise<Station>} - The added station.
     */
    async addStationToUser(userId, stationName, address) {
        const user = await this.fetchUser(userId);
        const newStation = this.stationRepository.create({
            station_name: stationName,
            address,
            user,
        });
        return await this.stationRepository.save(newStation);
    }

    /**
     * Removes a station from a user's list.
     * @param {number} userId - The user's ID.
     * @param {number} stationId - The station's ID to be removed.
     * @returns {Promise<boolean>} - True if the station was removed, otherwise false.
     */
    async deleteStationFromUser(userId, stationId) {
        try {
            const user = await this.fetchUser(userId);
            const updatedStations = user.stations.filter(station => station.id !== stationId);
            if (updatedStations.length === user.stations.length) throw new Error('Station not found');
            user.stations = updatedStations;
            await this.userRepository.save(user);
            return true;
        } catch (error) {
            console.error('Error deleting station:', error.message);
            throw new Error('Failed to delete station');
        }
    }

    /**
     * Adds a car to a user's list.
     * @param {number} userId - The user's ID.
     * @param {object} carDetails - The car data.
     * @returns {Promise<Car>} - The added car.
     */
    async addCarToUser(userId, make, model, year, color, fuelType = FuelType.GASOLINE) {
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
     * Removes a car from a user's list.
     * @param {number} userId - The user's ID.
     * @param {string} carId - The car's ID to be removed.
     * @returns {Promise<boolean>} - True if the car was removed, otherwise false.
     */
    async deleteCarFromUser(userId, carId) {
        try {
            const user = await this.fetchUser(userId);
            const updatedCars = user.cars.filter(car => car.id !== carId);
            if (updatedCars.length === user.cars.length) throw new Error('Car not found');
            user.cars = updatedCars;
            await this.userRepository.save(user);
            return true;
        } catch (error) {
            console.error('Error deleting car:', error.message);
            throw new Error('Failed to remove car');
        }
    }

    /**
     * Gets all cars associated with a user.
     * @param {number} userId - The user's ID.
     * @returns {Promise<Car[]>} - A list of cars associated with the user.
     */
    async getCarsByUser(userId) {
        const user = await this.fetchUser(userId);
        return user.cars;
    }

    /**
     * Gets all stations associated with a user.
     * @param {number} userId - The user's ID.
     * @returns {Promise<Station[]>} - A list of stations associated with the user.
     */
    async getStationsByUser(userId) {
        const user = await this.fetchUser(userId);
        return user.stations;
    }

}

module.exports = { 
    UserService 
};