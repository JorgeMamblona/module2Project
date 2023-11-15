const axios = require("axios")
const capitalize = require("../utils/capitalize")
const sortByID = require("../utils/sortByID")

class PokemonService {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: "https://pokeapi.co/api/v2"
        })
    }

    getAllPokemon() {
        return this.axiosApp.get("/pokemon?limit=10&offset=0")
        // return this.axiosApp.get("/pokemon?limit=10000&offset=0")
    }

    getOnePokemon(pokemon_name) {
        return this.axiosApp.get(`/pokemon/${pokemon_name}`)

    }

    getPokemonImage(pokemon_name) {
        return this.getOnePokemon(pokemon_name)
            .then((pokemon) => {
                const image = pokemon.data.sprites.other['official-artwork'].front_default
            })
            .catch(err => console.log(err))
    }

    getPokemonID(pokemon_name) {
        return this.getOnePokemon(pokemon_name)
            .then((pokemon) => {
                const id = pokemon.data.id
            })
            .catch(err => console.log(err))
    }

    getAllPokemonAndImages() {

        return new Promise((resolve, reject) => {
            const formattedList = []
            this.getAllPokemon()
                .then(pokelist => {
                    const promises = pokelist.data.results.map(elm => {
                        const name = elm.name
                        return this.getOnePokemon(name)
                    })
                    return Promise.all(promises)
                })
                .then(responses => {
                    responses.map(pokemon => {
                        const id = pokemon.data.id
                        const image = pokemon.data.sprites.other['official-artwork'].front_default
                        const name = pokemon.data.name
                        formattedList.push({ id, name, image })
                        formattedList.sort(sortByID)
                    })
                    console.log('terminado')
                    resolve(formattedList)
                })
                .catch(err => reject(err))

        })

    }

}

const pokemonService = new PokemonService()

module.exports = pokemonService


