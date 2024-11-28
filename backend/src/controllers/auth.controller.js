const AuthService = require('../services/auth.service');

class AuthController {
    static async Register(req, res) {
        try {
            const serviceRes = await AuthService.register({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                profileImage: req.body.profileImage || null
            });
    
            res.status(serviceRes.code).json({
                jwt: serviceRes.data,
                message: serviceRes.message
            });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async Authenticate(req, res) {
        try {
            const serviceRes = await AuthService.authenticate({
                password: req.body.password,
                username: req.body.email
            });

            res.status(serviceRes.code).json({
                jwt: serviceRes.data,
                message: serviceRes.message
            });
        } catch (error) {
            console.error('Error during authentication:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = AuthController;
