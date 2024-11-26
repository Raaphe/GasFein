const { connectToDataSource } = require('../configs/orm.config');
const { UserService } = require('../services/user.service');

let userService;

const initializeServices = async () => {
    try {
        await connectToDataSource();
        userService = new UserService();
    } catch (error) {
        console.error('Failed to initialize services:', error);
    }
};

const getUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userService.fetchUser(Number(userId));
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    const { firstName, lastName, email, password, profileImage } = req.body;
    try {
        const user = await userService.createUser(firstName, lastName, email, password, profileImage);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { firstName, lastName, email, password, profileImage } = req.body;
    try {
        const updatedUser = await userService.updateUser(Number(userId), { firstName, lastName, email, password, profileImage });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const isDeleted = await userService.deleteUser(Number(userId));
        if (isDeleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addStationToUser = async (req, res) => {
    const { userId } = req.params;
    const { stationName, address } = req.body;
    console.log(req.body);
    try {
        const station = await userService.addStationToUser(Number(userId), stationName, address);
        res.status(201).json(station);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteStationFromUser = async (req, res) => {
    const { userId, stationId } = req.params;
    try {
        const isDeleted = await userService.deleteStationFromUser(Number(userId), stationId);
        if (isDeleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Station not found or already removed' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCarToUser = async (req, res) => {
    const { userId } = req.params;
    const { make, model, year, color, fuelType } = req.body;
    try {
        const car = await userService.addCarToUser(Number(userId), make, model, year, color, fuelType);
        res.status(201).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCarFromUser = async (req, res) => {
    const { userId, carId } = req.params;

    try {
        const isDeleted = await userService.deleteCarFromUser(Number(userId), Number(carId));

        if (isDeleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Car not found or already removed' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getCarsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const cars = await userService.getCarsByUser(Number(userId));
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getStationsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const stations = await userService.getStationsByUser(Number(userId));
        res.json(stations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

initializeServices();

module.exports = {
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
};