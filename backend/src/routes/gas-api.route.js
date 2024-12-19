const express = require('express');
const { getGasPrices } = require('../controllers/gas-api.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Gas Api
 *     description: Operations related to gas prices
 */

/**
 * @swagger
 * /gas-prices/{province}/{city}:
 *   get:
 *     summary: Get gas prices for a specific province and city
 *     tags:
 *       - Gas Api
 *     parameters:
 *       - in: path
 *         name: province
 *         required: true
 *         schema:
 *           type: string
 *         description: The province to retrieve gas prices for
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: The city to retrieve gas prices for
 *     responses:
 *       200:
 *         description: Successfully retrieved gas prices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 gasPrices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       station:
 *                         type: string
 *                         description: The name of the gas station
 *                       price:
 *                         type: number
 *                         description: The gas price at the station
 *       500:
 *         description: Server error while fetching gas prices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Une erreur est survenue lors de la récupération des prix de l'essence.
 */

router.get('/gas-prices/:province/:city', getGasPrices);

module.exports = router;
