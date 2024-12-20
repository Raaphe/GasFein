const axios = require('axios')
const { open_route_service }  = require('../configs/general.config');

/**
 * Contrôleur pour obtenir les coordonnées d'une itinéraire.
 * @param {object} req - Objet de requête Express 
 * @param {object} res - Objet de réponse Express.
 */
const directions = async (req, res)=> {
    // const {coordinate} = req.data;
    // if(!coordinate){throw new Error("Coordinate not found")}
    try {
        let response = await axios.get(open_route_service(["8.681495","49.41461"],["8.687872","49.420318"]))
        console.log(response.data);
    }
    catch(err) {
        console.error(err)
        return res.status(401).json({message:"Error while trying fetch the directions"})
    }
}
module.exports = {
    directions
};