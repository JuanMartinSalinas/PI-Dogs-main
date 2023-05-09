const express = require('express');
const temperaments = express.Router();
const { Temperament } = require('../db');
const axios = require('axios')
require('dotenv').config();
const { API_KEY } = process.env;
const { getAllDogs } = require('../controllers/dogControllers');
const { getAllTemperaments } = require('../controllers/tempControllers');

temperaments.use(express.json());


temperaments.get('/temperament', async (req, res) => {
    try {
        let allTemps = await getAllTemperaments();
        let orderedTemps = allTemps.map(dog=> dog?.split(', '));
        let concatingTemps = orderedTemps.flat(1);
        let everyTemp = [...new Set(concatingTemps)]; // Set para que todos sean únicos y
        everyTemp.forEach(el => {                            // no haya temperamentos repetidos
            if (el) {
                Temperament.findOrCreate({
                    where: { name: el }
                });
            }
        });
        everyTemp = await Temperament.findAll();
        res.status(200).json(everyTemp);
    } catch (error) {
        res.status(404).send(error)
    }
}); // Ruta que trae todos los temperamentos de la API y los inserta en la base de datos


temperaments.get('/dog/', async (req, res) => {
    const temperament = req.query.temperament;

    console.log(temperament);

    const everyDog = await getAllDogs();
    const dogSearchResult = everyDog.filter((dog) => {
        if (temperament === 'all') return everyDog
        else if (dog.temperament) {
            return (dog.temperament.toLowerCase()).includes(temperament.toLowerCase())
        }
    });
    res.status(200).json(dogSearchResult)
}); // Ruta que permite filtrar los perros por temperamentos (/dog?temperament=stubborn)


// temperaments.post('/temperament/:temperament', async (req, res) => {
//     try{
//     const newTemperament = req.params.temperament;
//     const postedTemp = await Temperament.create({
//        name: newTemperament,
//     });
//     return res.status(200).json(postedTemp)
//     } catch (error) {
//         res.status(404).send(error)
//     }
// }); // Ruta que permite añadir temperamentos a la base de datos. No sé para qué, tengo que revisar el front

module.exports = temperaments;