const express = require('express');
const { directions } = require('../controllers/map.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Service Route
 *     description: Get directions service
 */

/**
 * @swagger
 * /directions/:
 *   get:
 *     summary: Get directions
 *     tags:
 *       - Service Route
 *     responses:
 *       200:
 *         description: Successfully fetched directions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 directions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       station:
 *                         type: string
 *                         description: The station providing the directions
 *                       distance:
 *                         type: string
 *                         description: The distance to the destination
 *       500:
 *         description: Server error while fetching directions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Une erreur est survenue lors de la récupération des directions.
 */

router.get('/directions/', directions);

module.exports = router;
