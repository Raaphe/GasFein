const {MapService} = require('../services/map.services')
/**
 * Contrôleur pour obtenir les coordonnées d'une itinéraire.
 * @param {object} req - Objet de requête Express 
 * @param {object} res - Objet de réponse Express.
 */
const directions = async (req, res) => {
    try {
        const points = JSON.parse(req.query.points); 
        console.log(points);

        if (points.length < 2) {
            return res.status(400).json({ message: "At least two coordinates are required for the route" });
        }

        const start = points[0];
        const end = points[points.length - 1]; 
        
        const response = await MapService.open_route_service(start,end);
        
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error while trying to fetch the directions" });
    }
};


module.exports = {
    directions,

};