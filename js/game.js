import { createBoard } from './board.js';

document.addEventListener('DOMContentLoaded', () => {
    const cardCount = parseInt(prompt("Syötä korttien määrä (parillinen luku):"), 10);
    if (cardCount % 2 !== 0) {
        alert("Korttien määrän täytyy olla parillinen luku.");
        return;
    }
    createBoard(cardCount);
});