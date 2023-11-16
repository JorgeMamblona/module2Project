const User = require("../models/User.model")
const Team = require('../models/Team.model')

const pokemonService = require('../services/pokemon.services')

//ADD TO TEAM
const addToTeamRender = (req, res, next) => {

    let { pokemon_name: pokemon } = req.params
    pokemon = pokemon.toLowerCase()
    const { _id: owner } = req.session.currentUser

    Team
        .findOneAndUpdate({ owner }, { $push: { pokemon } })
        .then(() => res.redirect("/trainers/my-team"))
        .catch(err => next(err))

}

//DELETE FROM TEAM
const deleteFromTeamRender = (req, res, next) => {

    let { pokemon_name: pokemon } = req.params
    pokemon = pokemon.toLowerCase()
    const { _id: owner } = req.session.currentUser

    Team
        .findOneAndUpdate({ owner }, { $pull: { pokemon } })
        .then(() => res.redirect("/trainers/my-team"))
        .catch(err => next(err))
}

//TRAINERS LIST
const trainersListRender = (req, res, next) => {

    User
        .find({ role: { $ne: "Admin" } })
        .then(trainers => res.render("trainers/list", { trainers }))
        .catch(err => next(err))
}

//MY TEAM
const myTeamRender = (req, res, next) => {

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
}

module.exports = {
    addToTeamRender,
    deleteFromTeamRender,
    trainersListRender,
    myTeamRender
}