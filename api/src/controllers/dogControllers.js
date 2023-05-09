const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env; 
const { Temperament,Dog } = require('../db');

async function getDogsData() {
    const unhandledInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?${API_KEY}`);
    const handledInfo = await unhandledInfo.data.map(e => {
        return {
            id: e.id,
            name: e.name,
            image: e.image.url,
            breed_group: e.breed_group,
            temperament: e.temperament,
            life_span: e.life_span,
            weight_min: parseInt(e.weight.metric.slice(0, 2)),
            weight_max: parseInt(e.weight.metric.slice(4)),
            height_min: parseInt(e.height.metric.slice(0, 2)),
            height_max: parseInt(e.height.metric.slice(4)) || parseInt(e.height.metric.slice(0, 2)),
            
        };
    });
    return handledInfo;
}; // Función que llama los datos de la API

async function getDogsDB() {
    let databaseInfo = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
          },
    })
    return databaseInfo;
}; // Función que llama los datos de la base de datos

async function getAllDogs() {
    const api = await getDogsData();
    const db = await getDogsDB();
    const all = api.concat(db);
    return all;
} // Función que concatena los datos de la base de datos y la API


module.exports = {
    getAllDogs, getDogsData, getDogsDB
}