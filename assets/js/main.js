const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonDetails = document.getElementById('pokemonDetails')

pokes = []

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name"><a href="javascript:getPokemonDetails(${pokemon.number})">${pokemon.name}</a></span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function getPokemonDetails(number){         
    loadMoreButton.parentElement.removeChild(loadMoreButton)
    pokemonList.parentElement.removeChild(pokemonList)
    
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokes = pokemons.map(convertPokemon)
        pokemonDetails.innerHTML = pokes[number-1]
    })

}

function convertPokemon(pokemon) {
    return `
        <div class="pokemonOne ${pokemon.type}">
            <span class="nameDetail">${pokemon.name}</span>    
            <span class="numberDetail">#${pokemon.number}</span>
            
            <div class="pokeDetail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="typeDetail ${type}">${type}</li>`).join('')}
                </ol>         
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">       
            </div>
            
            <a href="index.html" type="button">Voltar</a>
        </div>
    `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
