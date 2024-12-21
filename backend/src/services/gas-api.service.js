import axios from "axios";

/**
 * Service pour récupérer les prix des stations de gaz.
 * Fournit une méthode `get` pour obtenir une liste de stations
 * à partir d'une ville et d'une province.
 */
class GasApiService {

    static gasStationLogos = {
        "Shell": "https://1000logos.net/wp-content/uploads/2017/06/Shell-logo.jpg",
        "Costco": "https://cdn.cookielaw.org/logos/b94c5f12-6dd8-43ec-8f1e-23421ae25410/2183fee2-8d6a-4a9f-9eb4-9c8361fdd417/8cd47d2b-994c-4ce3-96bb-be15f7daa5f4/costcoLogoIdentityIntro@3x.png",
        "Harnois": "https://www.quebeccirculaire.org/data/sources/users/3048/20211022154607-harnoisenergieslogorgb-4.jpg",
        "Esso": "https://1000logos.net/wp-content/uploads/2022/12/Esso-logo.jpg",
        "Ultramar": "https://upload.wikimedia.org/wikipedia/en/1/1a/Ultramarlogo.png",
        "Canadian Tire": "https://corp.canadiantire.ca/files/images/brands-overview/2022/06/Gas-Logo_EN_Hor_Mic_RGB_2022.png",
        "Petro-Canada": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Petro-Canada_logo.svg/800px-Petro-Canada_logo.svg.png",
        "Pioneer": "https://logos-world.net/wp-content/uploads/2023/03/Pioneer-Logo.png",
        "Canco": "https://cancopetroleum.ca/static/media/cancoSingleLogo.641e3370a6fc45e7160f.png",
        "Chevron": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Chevron_Logo.svg/1836px-Chevron_Logo.svg.png",
        "default": "https://thumbs.dreamstime.com/b/gasoline-pump-nozzle-sign-gas-station-vector-colorful-clipart-fuel-flat-illustration-230579912.jpg"
    }

    static baseApiPath = "https://gas-prices-api.vercel.app";

    /**
     * Fetch gas prices for a specific province and city.
     * @param {string} province - The province to fetch gas prices for.
     * @param {string} city - The city to fetch gas prices for.
     * @returns {Promise<object|null>} Gas prices data or null in case of an error.
     */
    static async fetchGasPrices(province, city) {
        try {
            const response = await axios.get(`${this.baseApiPath}/${province}/${city}`);

            response.data.map((station) => {
                station.image = this.gasStationLogos[station.station_name] || this.gasStationLogos["default"];
            })

            console.log(response);

            return response.data;
        } catch (error) {
            console.error(
                `Failed to fetch gas prices for ${province}/${city}. Error: ${error.message}`
            );
            return null;
        }
    }
}

module.exports = {
    GasApiService
};