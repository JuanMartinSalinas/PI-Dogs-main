const express = require('express');
const temperamentsRoutes = express.Router();
const { Temperament } = require('../db');
require('dotenv').config();
const { getAllDogs } = require('../controllers/dogControllers');
const { getAllTemperaments } = require('../controllers/tempControllers');

temperamentsRoutes.use(express.json());


temperamentsRoutes.get('/temperament', async (req, res) => {
    try {
        let allTemps = await getAllTemperaments();
        allTemps.forEach(el => {
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


temperamentsRoutes.get('/dog/', async (req, res) => {
    const temperament = req.query.temperament;

    // console.log(temperament);

    const everyDog = await getAllDogs();
    const tempsByQuery = everyDog.filter((dog) => {
        if (temperament === 'all'){
            return everyDog
        }
        else if (dog.temperament) {
            return (dog.temperament.toLowerCase()).includes(temperament.toLowerCase())
        }
    });
    res.status(200).json(tempsByQuery)
}); // Ruta que permite filtrar los perros por temperamentos (/dog?temperament=stubborn)

module.exports = temperamentsRoutes;