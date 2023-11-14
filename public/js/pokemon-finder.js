document.querySelector('#inputByName').onkeyup = ev => {

    const { value: pokemonName } = ev.target

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
    let formatedList = []

    pokemonService
        .getPokemonByType(PokemonType)
        .then((response) => {
            const promises = response.data.pokemon.map((elm) => {
                const name = elm.pokemon.name
                return pokemonService.getPokemonByID(name)
            })
            Promise.all(promises).then(responses => {
                responses.map(value => {
                    if (value.data.id <= 351) {
                        console.log(value.data.id)
                        const image = value.data.sprites.other['official-artwork'].front_default
                        const name = value.data.name
                        formatedList.push({ name, image })
                    }
                })
                printPokemonList(formatedList)

            })

        })
        .catch(err => console.log('ok?'))
}

function printPokemonInfo(info) {
    removeAllChildNodes(pokemonName)
    let text = 'Result'

    let image = info.sprites.other['official-artwork'].front_default

    document.querySelector('#pokemonName').innerHTML = text
    document.getElementById('pokemonImage').src = image
}
function printPokemonList(list) {
    removeAllChildNodes(pokemonList)

    pokemonRow = document.createElement('div')
    pokemonRow.classList.add('row')
    pokemonRow.id = 'row'
    document.getElementById('pokemonList').appendChild(pokemonRow)

    list.forEach(elm => {
        pokemonCol = document.createElement('div')
        pokemonCol.classList.add('col-md-3')
        pokemonCol.id = `${elm.name}_card`

        pokemonCard = document.createElement('div')
        pokemonCard.classList.add("card", "mb-4", "border-info")
        pokemonCard.id = elm.name

        pokemon = document.createElement('img')
        pokemon.id = 'PokemonListImg'
        pokemon.src = elm.image

        pokemonBody = document.createElement('div')
        pokemonBody.classList.add("card-body")
        pokemonBody.id = `${elm.name}_body`

        pokemonName = document.createElement('h5')
        pokemonName.classList.add("card-title")
        pokemonName.innerHTML = elm.name.toUpperCase()
        pokemonName.id = `${elm.name}_name`

        pokemonBtns = document.createElement('div')
        pokemonBtns.classList.add("btn-group")
        pokemonBtns.id = `${elm.name}_btns`

        pokemonDtls = document.createElement('a')
        pokemonDtls.classList.add("btn", "btn-dark")
        pokemonDtls.innerHTML = 'See Details'
        pokemonDtls.id = `${elm.name}_dtls`

        pokemonAdd = document.createElement('a')
        pokemonAdd.classList.add("btn", "border-dark")
        pokemonAdd.innerHTML = 'Add to team'
        pokemonAdd.id = `${elm.name}_team`

        document.getElementById(pokemonRow.id).appendChild(pokemonCol)
        document.getElementById(pokemonCol.id).appendChild(pokemonCard)
        document.getElementById(pokemonCard.id).appendChild(pokemon)
        document.getElementById(pokemonCard.id).appendChild(pokemonBody)
        document.getElementById(pokemonBody.id).appendChild(pokemonName)
        document.getElementById(pokemonBody.id).appendChild(pokemonBtns)
        document.getElementById(pokemonBtns.id).appendChild(pokemonDtls)
        document.getElementById(pokemonBtns.id).appendChild(pokemonAdd)

    })
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}



