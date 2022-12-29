const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonDetails = document.getElementById('pokemonDetails')

let notData = false

const localIp = "http://192.168.0.11:8080"

let pokes = []

const maxRecords = 150
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
    let index = number-1
    if (!notData){
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }   
        
    pokemonList.parentElement.removeChild(pokemonList)
    
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokes = pokemons.map(convertPokemon)
        pokemonDetails.innerHTML = pokes[index]
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
        </div>

        <div class="pokemonOneData">
            <nav id="menu-h">
                <ul class="separator">
                    <li><a href="#">About</a></li>
                    
                    <li><a href="#">Base States</a></li>
                    
                    <li><a href="#">Evolution</a></li>
                    
                    <li><a href="#">Moves</a></li>
                </ul>
            </nav>
        
            <div class="poke-data">
                <table class="dataTable" width="100%">                
                    <tr>
                        <td width="35%">Height</td>
                        <td id="td">${pokemon.height}</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td id="td">${pokemon.weight}</td>
                    </tr>
                    <tr>
                        <td>Abilities</td>
                        <td id="td">
                            ${pokemon.abilities.map((ability) => `<span>${ability}</span>`).join(', ')}                           
                        </td>
                    </tr>
                    <tr>
                        <td>Base Experience</td>
                        <td id="td">${pokemon.base_experience}</td>
                    </tr>
                </table>
            </div>

            <div class="pagination">
                <button onclick="window.location.href='${localIp}'" type="button">Back</button>           
            </div>
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
        notData = true
    } else {
        loadPokemonItens(offset, limit)
    }
})
