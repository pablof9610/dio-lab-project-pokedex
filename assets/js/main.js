const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMore');
const modal = document.getElementById('myModal');
const modalContent = document.getElementsByClassName('modalContent');

const maxRecords = 151;
const limit = 10;
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
        pokemons.forEach((pokemon) => {
            addEventListenerToButton(pokemon);
        })
    })
    .catch((error) => console.log(error));
}

function addCloseModalFunctionToElement(element) {

}

function addEventListenerToButton(pokemon) {
    const button = document.querySelector(`.pokemonButton${pokemon.number}`);

    button.addEventListener('click', function () {
        modal.style.display = 'block';
        modal.innerHTML = `<div class="modalContent ${pokemon.mainType}">
                                        <span class="close${pokemon.number} closeModalButton">&times;</span>
                                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                                        <h1>${pokemon.name}</h1>
                                        <span></span>
                                        <h2>Abilities</h2>
                                        ${pokemon.abilities.map((ability) => `<p>${ability}</p>`).join('')}
                                    </div>`
        const currentCloseButton = document.getElementsByClassName(`close${pokemon.number}`)[0];
        currentCloseButton.addEventListener('click', () => {
            modal.style.display = 'none';
        })
    });
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