const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;

async function getAllTemperaments() {
    const allData = await axios.get(`https://api.thedogapi.com/v1/breeds?${API_KEY}`);
    let allTemps = allData.data.map(e => {
            if(e.temperament) {
                return e.temperament
            } else {
                "404 temperaments not found"
            };
        });
    let orderedTemps = allTemps.map(dog => {
        if(dog) {
            return dog.split(', ')
        } else {
            "404 temperaments not found"
        }});
    let concatingTemps = orderedTemps.flat(1);
    let everyTemp = [...new Set(concatingTemps)];
    return everyTemp;
}

module.exports = {
    getAllTemperaments
}