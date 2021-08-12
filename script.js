const pokedex = document.getElementById('pokedex')


const fetchPokemon = () => {

    const promises = [];

    for(let i = 1; i <= 150; i++){

        const url =`https://pokeapi.co/api/v2/pokemon/${i}`

        promises.push(fetch(url).then(res => res.json()))
    }

    Promise.all(promises).then((data) => {
        const pokemon = data.map((data) => ({
            id: data.id,
            name: data.name,
            image: data.sprites['front_default'],
            type: data.types.map(type => type.type.name).join(', ')
        }))

        displayPokemon(pokemon)

    })
}

const displayPokemon = (pokemon) => {
    const pokemonHTML = pokemon.map( pokeman => `
        <li class='card'>
            <img class='pokeContainer' src='${pokeman.image}' />
            <p class='text'>${pokeman.id}- ${pokeman.name}</p>
            <p class='subText'>Type: ${pokeman.type}</p>
        </p>
    `).join('')

    pokedex.innerHTML = pokemonHTML;
    console.log(pokemon)
}


fetchPokemon()
