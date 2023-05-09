const express = require('express');
const dogs = express.Router();
const { Temperament, Dog } = require('../db');
const { getAllDogs } = require('../controllers/dogControllers');

dogs.use(express.json());

dogs.get('/dogs', async (req, res) => {
    const name = req.query.name;
        try {
            let allDogs = await getAllDogs();
                if (name) {
                let dogName = allDogs.filter(
                    dog => dog.name.toLowerCase().includes(name.toLowerCase())
                );
                if (dogName) {
                    res.status(200).send(dogName);
                } else {
                    res.status(404).send("404 dogs not found");
                }
            } else {
                res.status(200).json(allDogs)
            }
        } catch (error) {
            res.status(404).json("404 dog name not found")
        }
    });


dogs.get('/dogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const allDogs = await getAllDogs();
        if (!id) {
            res.status(404).json("Couldn't find the name on DBase")
        } else {
            const dog = allDogs.find(dogui => dogui.id.toString() === id);
            res.status(200).json(dog)
        }
    } catch (error) {
        res.status(404).send(error)
    }
})


dogs.post('/dogs', async (req, res) => {
    let {
        name,height_min,height_max,weight_min,weight_max,life_span,temperament,image,
    } = req.body;
    console.log(name);

    if (name && height_min && height_max && weight_min && weight_max && temperament) {
        // takes that data for the new dog  
        const createDog = await Dog.create({
            name: name,
            height_min: parseInt(height_min),
            height_max: parseInt(height_max),
            weight_min: parseInt(weight_min),
            weight_max: parseInt(weight_max),
            life_span: life_span,
            image: image || 'https://dog.ceo/api/breeds/image/random',
        });
        temperament.map(async el => {
            const findTemp = await Temperament.findAll({
                where: { name: el }
            });
            createDog.addTemperament(findTemp);
        })
        res.status(200).send(createDog);
    } else {
        res.status(404).send('Data needed to proceed is missing');
    }
})


module.exports = dogs;