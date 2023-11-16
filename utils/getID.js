const pokemonService = require("../services/pokemon.services")
async function getID(pokemon_name) {
    const data = await pokemonService
        .getOnePokemon(pokemon_name)
        .then((pokemon) => {
            const id = pokemon.data.id
            return id
        })
        .catch(err => console.log(err))
    return data
}

module.exports = getID