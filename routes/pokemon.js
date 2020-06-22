var express = require('express');
const pokedex = require('./pokedex.json');


const pokedexRouter = express.Router();

pokedexRouter.get('/', (req, res) => {

    res.send(pokedex);
});

module.exports = pokedexRouter;
