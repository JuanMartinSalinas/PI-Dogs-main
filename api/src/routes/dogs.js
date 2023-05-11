const express = require('express');
const dogsRoutes = express.Router();
const { Temperament, Dog } = require('../db');
const { getAllDogs } = require('../controllers/dogControllers');

dogsRoutes.use(express.json());

dogsRoutes.get('/dogs', async (req, res) => {
    const { name } = req.query;
        try {
            let allDogs = await getAllDogs();
            if (name) {
                let nameOfDog = allDogs.filter(
                    dog => dog.name.toLowerCase().includes(name.toLowerCase()) // toLowerCase para que salgan independientemente de is en Query está en mayúscula o no
                );
                if (nameOfDog) {
                    res.status(200).send(nameOfDog);
                } else {
                    res.status(404).send("404 dogs not found");
                }
            } else {
                res.status(200).json(allDogs)
            }
        } catch (err) {
            res.status(404).json("404 dog name not found")
        }
});


dogsRoutes.get('/dogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const allDogs = await getAllDogs();
        if (!id) {
            res.status(404).json("Couldn't find the name on DBase")
        } else {
            const dog = allDogs.find(doge => doge.id.toString() === id);
            res.status(200).json(dog)
        }
    } catch (error) {
        res.status(404).send(error)
    }
})


dogsRoutes.post('/dogs', async (req, res) => {
    let {
        name,height_min,height_max,weight_min,weight_max,life_span,temperament,image,
    } = req.body;

    if (name && height_min && height_max && weight_min && weight_max && temperament) {
                
        // let repeated = await Dog.findAll({
        //     where: {
        //         name: name,
        //         height_min: parseInt(height_min),
        //         height_max: parseInt(height_max),
        //         weight_min: parseInt(weight_min),
        //         weight_max: parseInt(weight_max),
        //         life_span: life_span,
        //     }
        // });
        // if(repeated) {
        //     return console.log("Perro repetido.")
        // };

        const createDog = await Dog.create({
            name: name,
            height_min: parseInt(height_min),
            height_max: parseInt(height_max),
            weight_min: parseInt(weight_min),
            weight_max: parseInt(weight_max),
            life_span: life_span,
            image: image || 'https://cdn2.thedogapi.com/images/r1Ylge5Vm.jpg',
        });
        temperament.map(async t => {
            const findTemp = await Temperament.findAll({
                where: { name: t }
            });
            createDog.addTemperament(findTemp);
        })
        res.status(200).send(createDog);
    } else {
        res.status(404).send("404 Data not found");
    }
})


module.exports = dogsRoutes;