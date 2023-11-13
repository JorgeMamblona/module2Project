const pokemonService = require("../services/pokemon.services")
async function getImage(pokemon_name) {
    const data = await pokemonService
        .getOnePokemon(pokemon_name)
        .then((pokemon) => {
            const image = pokemon.data.sprites.other['official-artwork'].front_default
            return image

        })
        .catch(err => console.log(err))
    return data
}

module.exports = getImage
