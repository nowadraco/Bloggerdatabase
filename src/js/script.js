// URL do arquivo JSON
const url = 'https://raw.githubusercontent.com/nowadraco/Bloggerdatabase/refs/heads/main/src/data/gamemaster/pokemon.json';

// Função para carregar a lista de Pokémon e preencher o dropdown
function loadPokemonList() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let selectElement = document.getElementById('pokemon-select');

            // Popula o menu suspenso com nomes de Pokémon
            data.forEach(pokemon => {
                let option = document.createElement('option');
                option.value = pokemon.speciesName;
                option.text = pokemon.speciesName;
                selectElement.appendChild(option);
            });

            // Adiciona um evento para alterar o Pokémon exibido quando uma nova opção é selecionada
            selectElement.addEventListener('change', (event) => {
                let selectedName = event.target.value;
                fetchPokemonDataByName(selectedName);
            });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

// Função para buscar os dados do Pokémon pelo nome
function fetchPokemonDataByName(speciesName) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let selectedPokemon = data.find(pokemon => pokemon.speciesName === speciesName);
            displayPokemon(selectedPokemon);
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

// Função para exibir os dados do Pokémon selecionado
function displayPokemon(pokemon) {
    let container = document.getElementById('pokemon-container');
    container.innerHTML = `
        <h2>${pokemon.speciesName} (#${pokemon.dex})</h2>
        ${pokemon.types && pokemon.types.length > 0 ? `<p>Types: ${pokemon.types.join(', ')}</p>` : ''}
        ${pokemon.baseStats ? `<p>Base Stats: ATK: ${pokemon.baseStats.atk}, DEF: ${pokemon.baseStats.def}, HP: ${pokemon.baseStats.hp}</p>` : ''}
        ${pokemon.fastMoves && pokemon.fastMoves.length > 0 ? `<p>Fast Moves: ${pokemon.fastMoves.join(', ')}</p>` : ''}
        ${pokemon.chargedMoves && pokemon.chargedMoves.length > 0 ? `<p>Charged Moves: ${pokemon.chargedMoves.join(', ')}</p>` : ''}
        ${pokemon.buddyDistance ? `<p>Buddy Distance: ${pokemon.buddyDistance} km</p>` : ''}
        ${pokemon.thirdMoveCost ? `<p>Third Move Cost: ${pokemon.thirdMoveCost} Stardust</p>` : ''}
        ${pokemon.family && pokemon.family.evolutions && pokemon.family.evolutions.length > 0 ? `<p>Family Evolutions: ${pokemon.family.evolutions.join(', ')}</p>` : ''}
    `;
}

// Carrega a lista de Pokémon ao carregar a página
loadPokemonList();
