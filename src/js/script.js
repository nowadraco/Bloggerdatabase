fetch('https://raw.githubusercontent.com/nowadraco/Bloggerdatabase/refs/heads/main/src/data/gamemaster/output.json')
    .then(response => response.json())
    .then(data => {
        let filteredPokemonData = data.map(pokemon => {
            return {
                "dex": pokemon.dex,
                "speciesName": pokemon.speciesName,
                "speciesId": pokemon.speciesId,
                "baseStats": pokemon.baseStats,
                "types": pokemon.types,
                "fastMoves": pokemon.fastMoves,
                "chargedMoves": pokemon.chargedMoves,
                "buddyDistance": pokemon.buddyDistance,
                "thirdMoveCost": pokemon.thirdMoveCost,
                "family": pokemon.family
            };
        });

        let container = document.getElementById('pokemon-container');

        filteredPokemonData.forEach(pokemon => {
            let pokemonElement = document.createElement('div');
            pokemonElement.innerHTML = `
                <h2>${pokemon.speciesName} (#${pokemon.dex})</h2>
                <p>Types: ${pokemon.types.join(', ')}</p>
                <p>Base Stats: ATK: ${pokemon.baseStats.atk}, DEF: ${pokemon.baseStats.def}, HP: ${pokemon.baseStats.hp}</p>
                <p>Fast Moves: ${pokemon.fastMoves.join(', ')}</p>
                <p>Charged Moves: ${pokemon.chargedMoves.join(', ')}</p>
                <p>Buddy Distance: ${pokemon.buddyDistance} km</p>
                <p>Third Move Cost: ${pokemon.thirdMoveCost} Stardust</p>
                <p>Family Evolutions: ${pokemon.family.evolutions.join(', ')}</p>
            `;
            container.appendChild(pokemonElement);
        });
    })
    .catch(error => console.error('Erro ao buscar dados:', error));
