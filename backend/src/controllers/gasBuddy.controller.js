const axios = require('axios');


const getGas = async (req, res) => {
    const { city, province } = req.params;
    try {
        var gasBuddyRes = await axios.get(`https://gas-prices-api.vercel.app/${province}/${city}`);
        if (gasBuddyRes.status !== 200) {
            res.status(500).json({ message: "The serving API failed." });
            return;
        }

        console.log(res.data);
        

        res.status(200).json({ message: "Successfully fetched gas prices.", data: gasBuddyRes.data });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    getGas
};