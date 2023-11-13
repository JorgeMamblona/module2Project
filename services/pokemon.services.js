const axios = require("axios")

class PokemonService {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: "https://pokeapi.co/api/v2"
        })
    }

    getAllPokemon() {
        return this.axiosApp.get("/pokemon?limit=386&offset=0")
    }

    getOnePokemon(pokemon_name) {
        return this.axiosApp.get(`/pokemon/${pokemon_name}`)
    }
}

const pokemonService = new PokemonService()

module.exports = pokemonService


