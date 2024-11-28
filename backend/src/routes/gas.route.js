const express = require('express');
const { getGas } = require('../controllers/gasBuddy.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Gas
 *     description: Operations related to fetching gas prices.
 */

/**
 * @swagger
 * /api/gas/{province}/{city}:
 *   get:
 *     tags:
 *       - Gas
 *     summary: Get gas prices for a specific location
 *     description: Fetches gas prices for a given city and province
 *     parameters:
 *       - in: path
 *         name: province
 *         required: true
 *         schema:
 *           type: string
 *         description: Province name
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: City name
 *     responses:
 *       200:
 *         description: Successful response with gas prices
 *       404:
 *         description: Gas prices not found for the given location
 *       500:
 *         description: Internal server error
 */
router.get('/api/gas/:province/:city', getGas);

module.exports = router;
