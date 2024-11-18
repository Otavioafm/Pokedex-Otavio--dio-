//PokeAPI//
async function fetchPokemonData(pokemonId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Pokémon não encontrado.");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
    }
}

function getTypeColor(type) {
    const typeColors = {
        "normal": "#A8A77A",
        "fire": "#F44336",
        "water": "#2196F3",
        "electric": "#FFEB3B",
        "grass": "#4CAF50",
        "ice": "#00BCD4",
        "fighting": "#D32F2F",
        "poison": "#9C27B0",
        "ground": "#795548", 
        "flying": "#03A9F4",
        "psychic": "#E91E63",
        "bug": "#8BC34A",
        "rock": "#8D6E63",
        "ghost": "#673AB7",
        "dark": "#212121", 
        "dragon": "#9C27B0",
        "steel": "#607D8B",
        "fairy": "#FFC107",
    };
    return typeColors[type] || "#BDBDBD"; 
}

function createPokemonCard(pokemon) {
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const pokemonImage = pokemon.sprites.front_default || "default_image_url"; 
    const pokemonId = pokemon.id;

    const pokemonTypes = pokemon.types.map(typeInfo => {
        const typeName = typeInfo.type.name;
        const typeColor = getTypeColor(typeName);
        return `<span class="type" style="background-color: ${typeColor};">${typeName}</span>`;
    }).join(' '); 

    const stats = pokemon.stats.reduce((acc, stat) => {
        let statClass = stat.stat.name.replace('-', '_'); 
        acc.push(`
            <div class="stat ${statClass}">
                  <strong class="${statClass}">${stat.stat.name.replace('-', ' ').toUpperCase()}:</strong>
                 <span>${stat.base_stat}</span>
            </div>
        `);
        return acc;
    }, []).join('');
    const li = document.createElement('li');
    
    li.innerHTML = `
        <span class="pokemon-id">#${pokemonId}</span> <!-- ID do Pokémon -->
        <img src="${pokemonImage}" alt="${pokemonName}">
        <h2>${pokemonName}</h2>
        <p>${pokemonTypes}</p>
        <div class="stats">
            ${stats}
        </div>
        `;
    return li;
}

async function loadPokemons() {
    const totalPokemons = 649; 
    const pokemonsList = document.getElementById("pokemons-list");

    for (let i = 1; i <= totalPokemons; i++) {
        const pokemonData = await fetchPokemonData(i);
        if (pokemonData) {
                const pokemonCard = createPokemonCard(pokemonData);
                 pokemonsList.appendChild(pokemonCard); 
        }
    }
}
window.onload = loadPokemons;
