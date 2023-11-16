const generations = {
    first: 151,
    second: 250,
    all: 1017
}

let minToStart = 0

document.querySelector('#inputByName').onkeyup = ev => {
    if (minToStart > 3) {

        const { value: pokemonName } = ev.target

        pokemonService
            .getPokemonByID(pokemonName)
            .then(response => {
                minToStart = 0
                if (response.data.id <= generations.all) {
                    printPokemonInfo(response.data)
                } else if (response.data.id) {
                    alert('Only 1st Gen pokemon')
                }
            })
            .catch(err => console.log('NO HAY CON ESE NOMBRE, MELON'))
    } else {
        minToStart++
    }
}


document.querySelector('#inputByType').onkeyup = ev => {
    if (minToStart >= 3) {

        const { value: PokemonType } = ev.target

        pokemonService
            .getPokemonByType(PokemonType)
            .then((response) => {
                minToStart = 0
                const promises = response.data.pokemon.map((elm) => {
                    const name = elm.pokemon.name
                    return pokemonService.getPokemonByID(name)
                })
                return Promise.all(promises)
            })
            .then(responses => {
                const formatedList = responses.map(value => {
                    if (value.data.id <= generations.all) {
                        const image = value.data.sprites.other['official-artwork'].front_default
                        const { name } = value.data
                        const type = value.data.types[0].type.name
                        return { name, image, type }
                    }
                })
                printPokemonList(formatedList)

            })
            .catch(err => console.log('ok?'))
    } else {
        minToStart++
    }
}

function printPokemonInfo(info) {

    const {
        name,
        image = info.sprites.other['official-artwork'].front_default,
        type = info.types[0].type.name
    } = info

    removeAllChildNodes(pokemonList)

    pokemonRow = document.createElement('div')
    pokemonRow.classList.add('row')
    pokemonRow.id = 'row'
    document.getElementById('pokemonList').appendChild(pokemonRow)

    printPokemonCard({ name, image, type })

}
function printPokemonList(list) {
    removeAllChildNodes(pokemonList)

    pokemonRow = document.createElement('div')
    pokemonRow.classList.add('row')
    pokemonRow.id = 'row'
    document.getElementById('pokemonList').appendChild(pokemonRow)

    list.forEach(elm => {
        printPokemonCard(elm)
    })
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function printPokemonCard(elm) {
    pokemonCol = document.createElement('div')
    pokemonCol.classList.add('col-md-3')
    pokemonCol.id = `${elm.name}_card`

    pokemonCard = document.createElement('div')
    pokemonCard.classList.add("card", "mb-4", "border", "shadow", "p-3", "mb-5", "bg-body", "rounded", "backgroundImageAdjust", `backgroundType_${elm.type}`)
    pokemonCard.id = elm.name

    pokemon = document.createElement('img')
    pokemon.id = 'PokemonListImg'
    pokemon.src = elm.image

    pokemonBody = document.createElement('div')
    pokemonBody.classList.add("card-body")
    pokemonBody.id = `${elm.name}_body`

    pokemonName = document.createElement('h5')
    pokemonName.classList.add("card-title", "text-center", "bodyBackground", "border", "border-secondary-subtle", "rounded")
    pokemonName.innerHTML = elm.name.toUpperCase()
    pokemonName.id = `${elm.name}_name`

    pokemonBtns = document.createElement('div')
    pokemonBtns.classList.add("text-center")
    pokemonBtns.id = `${elm.name}_btns`

    pokemonDtls = document.createElement('a')
    pokemonDtls.classList.add("btn", "btn-secondary", "me-3")
    pokemonDtls.href = `/pokemon/${elm.name}`
    pokemonDtls.innerHTML = 'See Details'
    pokemonDtls.id = `${elm.name}_dtls`

    pokemonAdd = document.createElement('a')
    pokemonAdd.classList.add("btn", "btn-secondary")
    pokemonAdd.href = `/trainers/my-team/add/${elm.name}`
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
}