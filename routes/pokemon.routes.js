const express = require('express')
const router = express.Router()

const {
    finderRender,
    pokemonDetailsRender,
    pokemonGalleryRender
} = require('../controllers/pokemon.controllers')


router.get('/finder', finderRender)

router.get("/:pokemon_name", pokemonDetailsRender)

router.get("/", pokemonGalleryRender)


module.exports = router