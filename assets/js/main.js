const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMore');


const maxRecords = 2000;
const limit = 200;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
                    <li class="pokemon ${pokemon.mainType}" id="pokemonItem">
                            <span class="number">#${pokemon.number}</span>
                            <span class="name">${pokemon.name}</span>
                            
                            <div class="detail">
                                <ol class="types">
                                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                    <button type="button" class="pokemonButton${pokemon.number} openModalButton">Detail</button>
                                </ol>
            
                                <img src="${pokemon.photo}"
                                    alt="${pokemon.name}">
                            </div>
                        </li>
                    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');
    })
    .catch((error) => console.log(error));
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    debugger
    const qtdRecordNextPage = offset + limit;

    if(qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
})