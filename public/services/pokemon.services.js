class PokemonService {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: 'https://pokeapi.co/api/v2/'
        })
    }

    getAllPokemon(limit = 386, offset = 0) {
        return this.axiosApp.get(`/pokemon?limit=${limit}&offset=${offset}`)
    }

    getPokemonByID(pokemonName) {
        return this.axiosApp.get(`/pokemon/${pokemonName}`)

    }
    getPokemonByType(pokemonType) {
        return this.axiosApp.get(`/type/${pokemonType}`)

    }

}

const pokemonService = new PokemonService()