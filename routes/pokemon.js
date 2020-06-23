var express = require('express');
const pokedex = require('./pokedex.json');


const pokedexRouter = express.Router();

pokedexRouter.get('/:id/:info', (req, res, next) => {
    const { id, info } = req.params;
    const idAsNumber = parseInt(id, 10);

    const foundPokemon = pokedex.find((singlepokemon) => {
        return singlepokemon.id === idAsNumber;
    });

    res - Headers("Access-Control-Allow-Origin", "*");
    res - Headers("Access-Control-Allow-Headers", "X-Requested-With");
    res - Headers(singlepokemon[info]);

    res.send(foundPokemon[info]);
});

pokedexRouter.get('/:id', (req, res, next) => {
    const { id } = req.params;
    const idAsNumber = parseInt(id, 10);

    const foundPokemon = pokedex.find((singlepokemon) => {
        return singlepokemon.id === idAsNumber;
    });

    res - Headers("Access-Control-Allow-Origin", "*");
    res - Headers("Access-Control-Allow-Headers", "X-Requested-With");
    res - Headers(singlepokemon[info]);

    res.send(foundPokemon);
});

pokedexRouter.get('/', (req, res, next) => {

    res.send(pokedex);
});

module.exports = pokedexRouter;