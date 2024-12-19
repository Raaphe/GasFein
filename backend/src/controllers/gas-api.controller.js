const { GasApiService } = require('../services/gas-api.service');

/**
 * Contrôleur pour obtenir les prix de l'essence pour une province et une ville spécifiques.
 * @param {object} req - Objet de requête Express (attend `province` et `city` dans `req.params`).
 * @param {object} res - Objet de réponse Express.
 */
const getGasPrices = async (req, res) => {
    const { province, city } = req.params;

    try {
        const prices = await GasApiService.fetchGasPrices(province, city);

        if (!prices) {
            return res.status(404).json({ message: "Les prix de l'essence sont introuvables." });
        }

        res.json(prices);
    } catch (error) {
        console.error("Erreur lors de la récupération des prix de l'essence :", error.message);
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération des prix de l'essence." });
    }
};

module.exports = {
    getGasPrices
};