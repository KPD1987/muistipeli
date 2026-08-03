// # MUUTOKSET JA LISÄYKSET
// - Sama kortti ohitetaan, joten sen kaksoisklikkaus ei kasvata yritysmäärää.
// - Pelilauta lukitaan heti toisen eri kortin jälkeen, kunnes vuoro on ratkaistu.
// - Kortit ja pelissä käytettävät symbolit sekoitetaan Fisher–Yates-algoritmilla.
// - Uusi peli tyhjentää laudan, ajastimet ja kaiken edellisen pelin tilan.
// - Voitto tarkistetaan löydettyjen parien laskurista täsmälleen kerran.

import {
    createCardElement,
    flipCard,
    hideCard,
    markCardAsMatched
} from './card.js';

const allCards = [
    '🍎', '🍐', '🍒', '🍉', '🍇', '🍓', '🍌', '🍍',
    '🥝', '🥥', '🍑', '🍈', '🍋', '🍊', '🍏', '🍅'
];

const gameBoard = document.getElementById('game-board');
const emptyCallback = () => {};

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let gameEnded = false;
let attempts = 0;
let matchedPairs = 0;
let totalPairs = 0;
let turnTimer = null;
let gameCallbacks = {
    onAttempt: emptyCallback,
    onMatch: emptyCallback,
    onGameEnd: emptyCallback
};

// Fisher–Yates antaa jokaiselle korttijärjestykselle saman mahdollisuuden.
function shuffle(array) {
    const shuffledArray = [...array];

    for (let currentIndex = shuffledArray.length - 1; currentIndex > 0; currentIndex -= 1) {
        const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
            shuffledArray[randomIndex],
            shuffledArray[currentIndex]
        ];
    }

    return shuffledArray;
}

function validateCardCount(cardCount) {
    const isValidInteger = Number.isInteger(cardCount);
    const isEven = cardCount % 2 === 0;
    const isWithinLimits = cardCount >= 2 && cardCount <= allCards.length * 2;

    if (!isValidInteger || !isEven || !isWithinLimits) {
        throw new Error(`Korttien määrän täytyy olla parillinen luku väliltä 2–${allCards.length * 2}.`);
    }
}

function getColumnCount(cardCount) {
    if (cardCount <= 16) return 4;
    if (cardCount <= 20) return 5;
    if (cardCount <= 24) return 6;
    return 8;
}

function setBoardLayout(cardCount) {
    const columnClasses = ['columns-4', 'columns-5', 'columns-6', 'columns-8'];
    const columnCount = getColumnCount(cardCount);

    gameBoard.classList.remove(...columnClasses, 'game-board--complete');
    gameBoard.classList.add(`columns-${columnCount}`);
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function resetGameState() {
    if (turnTimer !== null) {
        clearTimeout(turnTimer);
        turnTimer = null;
    }

    firstCard = null;
    secondCard = null;
    lockBoard = false;
    gameEnded = false;
    attempts = 0;
    matchedPairs = 0;
}

function cardsMatch() {
    return firstCard.dataset.card === secondCard.dataset.card;
}

function finishMatchingTurn() {
    markCardAsMatched(firstCard);
    markCardAsMatched(secondCard);
    matchedPairs += 1;
    gameCallbacks.onMatch(matchedPairs, totalPairs);

    if (matchedPairs === totalPairs) {
        gameEnded = true;
        firstCard = null;
        secondCard = null;
        lockBoard = true;
        gameBoard.classList.add('game-board--complete');
        gameCallbacks.onGameEnd({ attempts, matchedPairs, totalPairs });
        return;
    }

    resetTurn();
}

function finishNonMatchingTurn() {
    turnTimer = window.setTimeout(() => {
        hideCard(firstCard);
        hideCard(secondCard);
        turnTimer = null;
        resetTurn();
    }, 1000);
}

function checkForMatch() {
    if (cardsMatch()) {
        finishMatchingTurn();
    } else {
        finishNonMatchingTurn();
    }
}

function handleCardClick(cardElement) {
    const clickIsBlocked = lockBoard
        || gameEnded
        || cardElement === firstCard
        || cardElement.classList.contains('matched');

    if (clickIsBlocked || !flipCard(cardElement)) return;

    if (firstCard === null) {
        firstCard = cardElement;
        return;
    }

    secondCard = cardElement;
    lockBoard = true;
    attempts += 1;
    gameCallbacks.onAttempt(attempts);
    checkForMatch();
}

export function createBoard(cardCount, callbacks = {}) {
    validateCardCount(cardCount);
    resetGameState();

    totalPairs = cardCount / 2;
    gameCallbacks = {
        onAttempt: callbacks.onAttempt ?? emptyCallback,
        onMatch: callbacks.onMatch ?? emptyCallback,
        onGameEnd: callbacks.onGameEnd ?? emptyCallback
    };

    const selectedCards = shuffle(allCards).slice(0, totalPairs);
    const shuffledCards = shuffle([...selectedCards, ...selectedCards]);

    gameBoard.replaceChildren();
    setBoardLayout(cardCount);

    shuffledCards.forEach((card, index) => {
        const cardElement = createCardElement(card, index);
        cardElement.addEventListener('click', () => handleCardClick(cardElement));
        gameBoard.appendChild(cardElement);
    });
}
