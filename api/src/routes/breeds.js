const express = require('express');
const breeds = express.Router();
// const {Temperament, Dog} = require('../db');
const { getAllDogs } = require('../controllers/dogControllers')

breeds.use(express.json());

breeds.get('/breedGroups', async (req, res) => {
    try {
        const allDogs = await getAllDogs();
        const allBreedGroups = allDogs?.map((dog) => {
        if (!dog.breed_group) {
            "No info"
        } else {
            return dog.breed_group
        }
    });
    const finalBreeds = [...new Set(allBreedGroups.flat())] // Set para que todos sean distintos
    res.status(200).json(finalBreeds.sort())
    } catch (err) {
        console.log(err, "404 breed not found")
    }
}); // Ruta que trae todas las razas de perros de la API

breeds.get('/breedGroup', async (req, res) => {
    const breedGroup = req.query.breedGroup;
    const everyDog = await getAllDogs();
    const dogSearchResult = everyDog.filter((dog) => {
        if(breedGroup === 'all') return everyDog
        else if (dog.breed_group !== undefined) {
            return (dog.breed_group.toLowerCase()).includes(breedGroup.toLowerCase())
        }
    });
    res.status(200).json(dogSearchResult)
}); // Ruta que trae todos los perros de la API que coincidan con la raza asignada por query (breedGroup?breedGroup=Toy)

module.exports = breeds;