const pokemonService = require("../services/pokemon.services")
const capitalize = require("../utils/capitalize")

//POKEMON FINDER
const finderRender = (req, res) => {
    res.render('pokemon/pokemon-finder')
}

//POKEMON DETAILS
const pokemonDetailsRender = (req, res, next) => {

    const { pokemon_name } = req.params

    pokemonService
        .getOnePokemon(pokemon_name.toLowerCase())
        .then(pokemon => {

            const {
                styledName = capitalize(pokemon.data.name),
                image = pokemon.data.sprites.other['official-artwork'].front_default,
                height,
                weight,
                stats,
                types
            } = pokemon.data

            res.render("pokemon/pokemon-details", { styledName, image, height, weight, stats, types })
        })
        .catch(err => next(err))
}

//POKEMON GALLERY
const pokemonGalleryRender = (req, res, next) => {

    pokemonService
        .getAllPokemonAndImages()
        .then(pokemonList => {
            res.render('pokemon/pokemon-gallery', { pokemonList })
        })
        .catch(err => next(err))
}

module.exports = {
    finderRender,
    pokemonDetailsRender,
    pokemonGalleryRender
}