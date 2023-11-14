document.querySelector('#inputByName').onkeyup = ev => {

    const { value: pokemonName } = evt.target

    pokemonService
        .getPokemonByID(pokemonName)
        .then(response => {
            if (response.data.id <= 151) {
                printPokemonInfo(response.data)
            } else if (response.data.id) {
                alert('Only 1st Gen pokemon')
            }
        })
        .catch(err => new Error(err))

}


document.querySelector('#inputByType').onkeyup = ev => {

    const { value: PokemonType } = ev.target

    pokemonService
        .getPokemonByType(PokemonType)
        .then((response) => {
            const formatedList = []
            response.data.pokemon.map((elm) => {
                const name = elm.pokemon.name
                let image = ''
                pokemonService
                    .getPokemonByID(name)
                    .then(response => {
                        image = response.data.sprites.other['official-artwork'].front_default
                        formatedList.push({ name, image })
                    })
                    .catch(err => console.log(err))

            })
            console.log(formatedList)
        })
}

function printPokemonInfo(info) {

    let text = info.name

    let image = info.sprites.other['official-artwork'].front_default

    document.querySelector('#pokemonName').innerHTML = text
    document.getElementById('pokemonImage').src = image
}

