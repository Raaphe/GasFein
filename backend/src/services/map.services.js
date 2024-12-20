import axios from "axios";
import { config } from "../configs/general.config";

/**
 * Service pour récupérer les prix des stations de gaz.
 * Fournit une méthode `get` pour obtenir une liste de stations
 * à partir d'une ville et d'une province.
 */
class MapService {
    static baseApiPath = "https://api.openrouteservice.org/";

    static async open_route_service(start, end) {

        try {
            const geocode = await this.open_route_service_get_geocode(start.addr);
            if(!geocode){throw new Error("geocode not found")};
            const res = await axios.get(`${this.baseApiPath}v2/directions/driving-car?api_key=${config.GASFEIN_TKN}&start=${geocode[0]},${geocode[1]}&end=${end.long},${end.lat}`);
            return res.data.features[0].geometry.coordinates;
        }
        catch (err) {
            console.error(err);
            return err;
        }
    }

    static async open_route_service_get_geocode(addr) {
        if (!addr) { throw new Error("addr must be valid") }
        try {
            const res = await axios.get(`${this.baseApiPath}geocode/search?api_key=${config.GASFEIN_TKN}&text=${addr}`);
            return res.data.features[0].geometry.coordinates;
        }
        catch (err) {
            console.error(err);
            return err;
        }
    }

}

module.exports = {
    MapService
};