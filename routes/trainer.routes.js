const express = require('express')
const router = express.Router()
const User = require("../models/User.model")
const Team = require('../models/Team.model')
const { isLoggedIn } = require('../middleware/route-guard')
const pokemonService = require('../services/pokemon.services')

router.get("/my-team/add/:pokemon_name", isLoggedIn, (req, res, next) => {

    let { pokemon_name: pokemon } = req.params
    pokemon = pokemon.toLowerCase()
    const { _id: owner } = req.session.currentUser

    Team
        .findOneAndUpdate({ owner }, { $push: { pokemon } })
        .then(() => res.redirect("/trainers/my-team"))
        .catch(err => next(err))

})

router.post("/my-team/delete/:pokemon_name", isLoggedIn, (req, res, next) => {

    let { pokemon_name: pokemon } = req.params
    pokemon = pokemon.toLowerCase()
    const { _id: owner } = req.session.currentUser

    Team
        .findOneAndUpdate({ owner }, { $pull: { pokemon } })
        .then(() => res.redirect("/trainers/my-team"))
        .catch(err => next(err))
})




router.get("/", isLoggedIn, (req, res, next) => {

    User
        .find({ role: { $ne: "Admin" } })
        .then(trainers => res.render("trainers/list", { trainers }))
        .catch(err => next(err))
})

router.get("/my-team", isLoggedIn, (req, res, next) => {

    const { _id: owner } = req.session.currentUser

    Team
        .findOne({ owner })
        .then(team => {
            const promises = team.pokemon.map(pokemon => pokemonService.getOnePokemon(pokemon))
            return Promise.all(promises)
        })
        .then(response => {
            const pokemonList = response.map(value => {
                const image = value.data.sprites.other['official-artwork'].front_default
                let { name } = value.data
                name = name.toUpperCase()
                return { name, image }
            })
            res.render("trainers/my-team", { pokemonList })
        })
        .catch(err => next(err))


})

module.exports = router