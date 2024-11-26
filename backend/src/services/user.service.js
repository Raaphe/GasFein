const { dataSource } = require('../configs/db.config');
const { hashPassword } = require('../utils/security.util');
const { User } = require('../models/user.model');

const userRepository = dataSource.getRepository(User);

/**
 * Create a new user and save it to the database.
 * @param {string} first_name - The user's first name.
 * @param {string} last_name - The user's last name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @param {string} profile_image - The URL/path to the user's profile image.
 * @returns {Promise<User>} The created user.
 */
async function createUser(first_name, last_name, email, password, profile_image) {
    const newUser = new User();
    newUser.first_name = first_name;
    newUser.last_name = last_name;
    newUser.email = email;
    newUser.password = hashPassword(password);
    newUser.profile_image = profile_image;

    try {
        const savedUser = await userRepository.save(newUser);
        console.log('User created successfully:', savedUser);
        return savedUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
    }
}

/**
 * Get a user by their ID.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<User>} The user with the specified ID.
 */
async function getUserById(userId) {
    try {
        const user = await userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
}

/**
 * Get a user by their email address.
 * @param {string} email - The user's email address.
 * @returns {Promise<User>} The user with the specified email.
 */
async function getUserByEmail(email) {
    try {
        const user = await userRepository.findOneBy({ email: email });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
}

/**
 * Update an existing user's details.
 * @param {number} userId - The ID of the user to update.
 * @param {Object} updateData - An object containing the data to update (e.g., { first_name, last_name, profile_image }).
 * @returns {Promise<User>} The updated user.
 */
async function updateUser(userId, updateData) {
    try {
        const user = await getUserById(userId);
        
        Object.assign(user, updateData);

        const updatedUser = await userRepository.save(user);
        console.log('User updated successfully:', updatedUser);
        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

/**
 * Delete a user by their ID.
 * @param {number} userId - The ID of the user to delete.
 * @returns {Promise<boolean>} Returns true if deletion was successful, false otherwise.
 */
async function deleteUser(userId) {
    try {
        const user = await getUserById(userId);
        await userRepository.remove(user);
        console.log('User deleted successfully:', userId);
        return true;
    } catch (error) {
        console.error('Error deleting user:', error);
        return false;
    }
}

/**
 * Get all users from the database.
 * @returns {Promise<User[]>} A list of all users.
 */
async function getAllUsers() {
    try {
        const users = await userRepository.find();
        return users;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
}

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
    getAllUsers
};