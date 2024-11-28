const jwt = require('jsonwebtoken');
const { comparePassword } = require('../utils/security.util');
const { config } = require("../configs/general.config");
const { UserService } = require('./user.service');
const { connectToDataSource } = require('../configs/orm.config');


let userService;

const init = async () => {
    try {
        await connectToDataSource();
        userService = new UserService();
    } catch (error) {
        console.error('Failed to initialize services:', error);
    }
};


class AuthService {

    static async register(registrationDto) {
        try {
            await userService.createUser(
                registrationDto.firstName,
                registrationDto.lastName,
                registrationDto.email,
                registrationDto.password,
                registrationDto.profileImage
            );
            console.log(config.JWT_SECRET);


            const token = jwt.sign({ username: registrationDto.username }, config.JWT_SECRET ?? "", { expiresIn: '1h' });
    
            return {
                code: 200,
                data: token,
                message: "Successfully Registered."
            };
        } catch (e) {
            console.log(`Error in register method: ${e.message}`, e);
            return {
                code: 400,
                data: "",
                message: e.message || 'An error occurred during registration',
            };
        }
    }

    static async authenticate(loginDto) {
        console.log(loginDto);
        const user = await userService.fetchUserByEmail(loginDto.username);

        if (!user) {
            return {code : 400, message: 'Utilisateur non trouvé', data:""}
        }
        
        const isValidPassword = await comparePassword(loginDto.password.trim(), user.password);
        if (!isValidPassword) {
            return {code : 400, message: 'Mot de passe incorrect', data: ""}
        }

        // Génération d'un JWT
        const token = jwt.sign({ username: user.email }, config.JWT_SECRET, { expiresIn: '1h' });
        return {
            code: 200,
            message: "Logged in Successfully",
            data: token,
        }
    }
}


init();

module.exports = AuthService;
