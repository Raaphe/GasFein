const express = require('express');
const { directions } = require('../controllers/map.controller');

const router = express.Router();

/**
 * @swagger
 * /directions/coordinates:
 *   get:
 *     summary: Get directions with multiple coordinates
 *     parameters:
 *       - in: query
 *         name: points
 *         required: true
 *         schema:
 *           type: string
 *           description: JSON array of coordinates [{address:""},{long:"",lat:""}]
 *     responses:
 *       200:
 *         description: Successfully fetched directions
 *       500:
 *         description: Server error while fetching directions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error while trying to fetch the directions
 */

router.get('/directions/coordinates', directions);

module.exports = router;
