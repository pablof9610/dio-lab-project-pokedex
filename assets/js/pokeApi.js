const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name.replace(pokeDetail.name[0], pokeDetail.name[0].toUpperCase());
    const types = pokeDetail.types.map((typeSlot) => {
        return typeSlot.type.name;
    });
    const [type] = types;
    pokemon.types = types;
    pokemon.mainType = type;
    pokemon.photo = pokeDetail.sprites.front_default;
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then((pokeApiStylePokemon) => convertPokeApiDetailToPokemon(pokeApiStylePokemon));
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map((pokemon) => pokeApi.getPokemonDetail(pokemon)))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails)
}