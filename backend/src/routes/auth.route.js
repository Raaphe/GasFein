const express = require('express');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Authenticate user
 *     security: []
 *     description: Authenticates a user based on email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: P@ssw0rd123
 *     responses:
 *       200:
 *         description: Successful authentication
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/auth', AuthController.Authenticate);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register new user
 *     security: []
 *     description: Creates a new user account with email, password, name, first name, last name, and profile image
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User's first name
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: P@ssw0rd123
 *               profileImage:
 *                 type: string
 *                 format: binary
 *                 description: Base64 encoded profile image
 *                 example: base64 encoded image data
 *     responses:
 *       201:
 *         description: Successfully registered new user
 *       400:
 *         description: Bad request (e.g., invalid data)
 *       409:
 *         description: Conflict (email already exists)
 *       500:
 *         description: Internal server error
 */
router.post('/register', AuthController.Register);


module.exports = router;
