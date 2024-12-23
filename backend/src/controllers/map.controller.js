const {MapService} = require('../services/map.services')
/**
 * Contrôleur pour obtenir les coordonnées d'une itinéraire.
 * @param {object} req - Objet de requête Express 
 * @param {object} res - Objet de réponse Express.
 */
const directions = async (req, res) => {
    try {
        const points = req.body;

        if (!Array.isArray(points) || points.length < 2) {
            return res.status(400).json({ message: "At least two points (coordinates or addresses) are required for the route." });
        }

        const start = points[0];
        const end = points[points.length - 1];
        

        const isValidPoint = (point) => {
            return (
                (point.longitude !== undefined && point.latitude !== undefined) ||
                (point.address !== undefined)
            );
        };

        if (!isValidPoint(start) || !isValidPoint(end)) {
            return res.status(400).json({ message: "Invalid points format. Each point must contain either 'longitude' and 'latitude', or 'address'." });
        }

        const response = await MapService.open_route_service(start, end);

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error while trying to fetch the directions" });
    }
};


module.exports = {
    directions,

};