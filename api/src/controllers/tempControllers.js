const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;

async function getAllTemperaments() {
    const allData = await axios.get(`https://api.thedogapi.com/v1/breeds?${API_KEY}`);
    let allTemps = allData.data.map(dog => {
            if(dog.temperament) {
                return dog.temperament
            } else {
                "404 temperaments not found"
            };
        });
    return allTemps;
}

module.exports = {
    getAllTemperaments
}