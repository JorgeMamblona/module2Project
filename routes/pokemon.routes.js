const express = require('express')
const router = express.Router()

const pokemonService = require("../services/pokemon.services")
const getImage = require('../utils/getImage')
const getID = require('../utils/getID')
const sortByID = require('../utils/sortByID')

router.get("/", (req, res, next) => {

    pokemonService
        .getAllPokemon()
        .then(async (pokelist) => {
            const formattedList = []
            const promises = pokelist.data.results.map(async (elm) => {

                const name = elm.name
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