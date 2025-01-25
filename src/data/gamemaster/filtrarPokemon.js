const fs = require('fs');
const https = require('https');

const url = 'https://raw.githubusercontent.com/nowadraco/Bloggerdatabase/refs/heads/main/src/data/gamemaster/pokemon.json';

https.get(url, (resp) => {
    let data = '';

    // Recebendo os dados em partes
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // O conteúdo completo foi recebido
    resp.on('end', () => {
        let pokemonData = JSON.parse(data);
        let filteredPokemonData = pokemonData.map(pokemon => {
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

        fs.writeFile('output.json', JSON.stringify(filteredPokemonData, null, 2), 'utf8', err => {
            if (err) {
                console.error('Erro ao escrever o arquivo:', err);
                return;
            }
            console.log('Arquivo JSON filtrado criado com sucesso!');
        });
    });

}).on("error", (err) => {
    console.error("Erro ao baixar os dados:", err.message);
});
