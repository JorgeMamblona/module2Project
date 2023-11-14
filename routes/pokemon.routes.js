const express = require('express')
const router = express.Router()


const pokemonService = require("../services/pokemon.services")
const getImage = require('../utils/getImage')
const getID = require('../utils/getID')
const sortByID = require('../utils/sortByID')
const capitalize = require("../utils/capitalize")

router.get('/finder', (req, res) => {
    res.render('pokemon/pokemon-finder')
})

router.get("/:pokemon_name", (req, res, next) => {

    const { pokemon_name } = req.params


    pokemonService
        .getOnePokemon(pokemon_name.toLowerCase())
        .then(pokemon => {
            // res.send(pokemon.data)

            const styledName = capitalize(pokemon.data.name)
            const image = pokemon.data.sprites.other['official-artwork'].front_default
            const height = pokemon.data.height
            const weight = pokemon.data.weight
            const stats = pokemon.data.stats
            const types = pokemon.data.types
            console.log(stats)

            res.render("pokemon/pokemon-details", { styledName, image, height, weight, stats, types })
        })
        .catch(err => next(err))
})

router.get("/", (req, res, next) => {

    pokemonService
        .getAllPokemon()
        .then(async (pokelist) => {
            const formattedList = []
            const promises = pokelist.data.results.map(async (elm) => {

                const name = capitalize(elm.name)
                const image = await getImage(elm.name)
                const id = await getID(elm.name)
                formattedList.push({ id, name, image })

            })
            await Promise.all(promises)
            formattedList.sort(sortByID)

            res.render('pokemon/pokemon-gallery', { formattedList })
        })
        .catch(err => next(err))


})


module.exports = router