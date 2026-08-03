// # MUUTOKSET JA LISÄYKSET
// - Sivun latauksen yhteydessä käynnistyy oletuksena 16 kortin peli.
// - Aloita uusi peli -painike rakentaa laudan uudelleen ilman sivun päivittämistä.
// - Käyttöliittymä näyttää yritykset, löydetyt parit ja varman voittoilmoituksen.

import { createBoard } from './board.js';

document.addEventListener('DOMContentLoaded', () => {
    const cardCountSelect = document.getElementById('card-count');
    const newGameButton = document.getElementById('new-game-button');
    const attemptCount = document.getElementById('attempt-count');
    const pairCount = document.getElementById('pair-count');
    const gameStatus = document.getElementById('game-status');

    function startNewGame() {
        const cardCount = Number.parseInt(cardCountSelect.value, 10);
        const totalPairs = cardCount / 2;

        attemptCount.textContent = '0';
        pairCount.textContent = `0 / ${totalPairs}`;
        gameStatus.textContent = 'Peli käynnissä – valitse ensimmäinen kortti.';

        try {
            createBoard(cardCount, {
                onAttempt(attempts) {
                    attemptCount.textContent = attempts;
                },
                onMatch(matchedPairs, pairTotal) {
                    pairCount.textContent = `${matchedPairs} / ${pairTotal}`;
                    gameStatus.textContent = matchedPairs === pairTotal
                        ? 'Kaikki parit löytyivät!'
                        : 'Pari löytyi – jatka seuraavaan.';
                },
                onGameEnd({ attempts }) {
                    gameStatus.textContent = `Voitit pelin ${attempts} yrityksellä! Aloita halutessasi uusi peli.`;
                }
            });
        } catch (error) {
            gameStatus.textContent = error.message;
        }
    }

    newGameButton.addEventListener('click', startNewGame);
    startNewGame();
});
