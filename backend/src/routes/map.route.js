const express = require('express');
const { directions } = require('../controllers/map.controller');

const router = express.Router();

/**
 * @swagger
 * /directions/coordinates:
 *   post:
 *     summary: Get directions with multiple points
 *     description: Accepts an array of objects containing either coordinates (longitude and latitude) or an address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               oneOf:
 *                 - properties:
 *                     longitude:
 *                       type: number
 *                       example: -73.586295
 *                     latitude:
 *                       type: number
 *                       example: 45.572744
 *                   required:
 *                     - longitude
 *                     - latitude
 *                 - properties:
 *                     address:
 *                       type: string
 *                       example: "8855 Ch de Chambly"
 *                   required:
 *                     - address
 *     responses:
 *       200:
 *         description: Successfully fetched directions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Directions retrieved successfully
 *                 route:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       longitude:
 *                         type: number
 *                         example: -73.586295
 *                       latitude:
 *                         type: number
 *                         example: 45.572744
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid format. Please provide either coordinates or an address.
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

router.post('/directions/coordinates', directions);

module.exports = router;
