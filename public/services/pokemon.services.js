class PokemonService {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: 'https://pokeapi.co/api/v2/'
        })
    }
    getAllPokemon() {
        return this.axiosApp.get("/pokemon?limit=386&offset=0")
    }

    getPokemonByID(pokemonName) {
        return this.axiosApp.get(`/pokemon/${pokemonName}`)

    }
    getPokemonByType(PokemonType) {
        return this.axiosApp.get(`/type/${PokemonType}`)

    }

}

const pokemonService = new PokemonService()