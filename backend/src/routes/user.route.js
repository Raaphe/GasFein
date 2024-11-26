const express = require('express');
const { 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser, 
    addStationToUser, 
    deleteStationFromUser,
    addCarToUser,
    deleteCarFromUser,
    getCarsByUser, 
    getStationsByUser 
} = require('../controllers/user.controller');

const router = express.Router();

/**
 * ===========================
 * USER ROUTES
 * ===========================
 */

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operations related to user management
 */

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get a user by ID
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The ID of the user
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *       404:
 *         description: User not found
 */
router.get('/users/:userId', getUser);

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profileImage:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/users', createUser);

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update an existing user's details
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The ID of the user to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profileImage:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       500:
 *         description: Internal server error
 */
router.put('/users/:userId', updateUser);

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user by ID
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The ID of the user to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/users/:userId', deleteUser);

/**
 * ===========================
 * STATION ROUTES
 * ===========================
 */

/**
 * @swagger
 * tags:
 *   - name: Stations
 *     description: Operations related to user stations
 */

/**
 * @swagger
 * /users/{userId}/stations:
 *   post:
 *     tags:
 *       - Stations
 *     summary: Add a station to a user
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The ID of the user to add a station to
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stationName:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Station added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/users/:userId/stations', addStationToUser);

/**
 * @swagger
 * /users/{userId}/stations/{stationId}:
 *   delete:
 *     tags:
 *       - Stations
 *     summary: Remove a station from a user's list of stations
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The ID of the user from whose station list the station will be removed
 *         required: true
 *         schema:
 *           type: integer
 *       - name: stationId
 *         in: path
 *         description: The ID of the station to be removed
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The station was successfully removed from the user's list
 *       404:
 *         description: The station could not be found or is already removed
 *       500:
 *         description: Failed to delete the station from the user's list due to an internal error
 */
router.delete('/users/:userId/stations/:stationId', deleteStationFromUser);

/**
 * @swagger
 * /users/{userId}/stations:
 *   get:
 *     tags:
 *       - Stations
 *     summary: Get all stations of a user
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The ID of the user to fetch stations for
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of stations retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get('/users/:userId/stations', getStationsByUser);

/**
 * ===========================
 * CAR ROUTES
 * ===========================
 */

/**
 * @swagger
 * tags:
 *   - name: Cars
 *     description: Operations related to user cars
 */

/**
 * @swagger
 * /users/{userId}/cars:
 *   post:
 *     tags:
 *       - Cars
 *     summary: Add a car to a user
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The ID of the user to add a car to
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *               color:
 *                 type: string
 *               fuelType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Car added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/users/:userId/cars', addCarToUser);

/**
 * @swagger
 * /users/{userId}/cars/{carId}:
 *   delete:
 *     tags:
 *       - Cars
 *     summary: Remove a car from a user's list of cars
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The ID of the user whose car list the car will be removed from
 *         required: true
 *         schema:
 *           type: integer
 *       - name: carId
 *         in: path
 *         description: The ID of the car to be removed
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The car was successfully removed from the user's list
 *       404:
 *         description: The car could not be found or is already removed
 *       500:
 *         description: Failed to delete the car from the user's list due to an internal error
 */
router.delete('/users/:userId/cars/:carId', deleteCarFromUser);

/**
 * @swagger
 * /users/{userId}/cars:
 *   get:
 *     tags:
 *       - Cars
 *     summary: Get all cars of a user
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The ID of the user to fetch cars for
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of cars retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get('/users/:userId/cars', getCarsByUser);

module.exports = router;