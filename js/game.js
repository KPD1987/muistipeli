// # MUUTOKSET JA LISÄYKSET
// - Ajastin käynnistyy ensimmäisestä kortista ja pysähtyy viimeiseen pariin.
// - Korttikuvateemaksi voi valita hedelmät, eläimet tai avaruuden.
// - Tumma ja vaalea väriteema vaihtuvat ilman pelin uudelleenkäynnistystä.
// - Korttien käännöille, pareille ja voitolle on omat ääniefektit.
// - Äänet voidaan mykistää erillisellä painikkeella.
// - Aloita uusi peli nollaa laudan, laskurit ja ajan ilman sivun päivittämistä.

import { createBoard } from './board.js';
import {
    playFlipSound,
    playMatchSound,
    playWinSound,
    setSoundEnabled
} from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
    const cardCountSelect = document.getElementById('card-count');
    const cardThemeSelect = document.getElementById('card-theme');
    const colorThemeSelect = document.getElementById('color-theme');
    const soundToggle = document.getElementById('sound-toggle');
    const newGameButton = document.getElementById('new-game-button');
    const attemptCount = document.getElementById('attempt-count');
    const pairCount = document.getElementById('pair-count');
    const elapsedTime = document.getElementById('elapsed-time');
    const gameStatus = document.getElementById('game-status');

    let soundIsEnabled = true;
    let timerInterval = null;
    let timerStartedAt = null;
    let savedElapsedTime = 0;

    function formatElapsedTime(milliseconds) {
        const safeMilliseconds = Math.max(0, milliseconds);
        const totalSeconds = Math.floor(safeMilliseconds / 1000);
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        const tenths = Math.floor((safeMilliseconds % 1000) / 100);

        return `${minutes}:${seconds}.${tenths}`;
    }

    function getCurrentElapsedTime() {
        if (timerStartedAt === null) return savedElapsedTime;
        return Date.now() - timerStartedAt;
    }

    function renderTimer() {
        elapsedTime.textContent = formatElapsedTime(getCurrentElapsedTime());
    }

    function resetTimer() {
        if (timerInterval !== null) {
            clearInterval(timerInterval);
        }

        timerInterval = null;
        timerStartedAt = null;
        savedElapsedTime = 0;
        renderTimer();
    }

    function startTimer() {
        if (timerStartedAt !== null) return;

        timerStartedAt = Date.now();
        renderTimer();
        timerInterval = window.setInterval(renderTimer, 100);
    }

    function stopTimer() {
        if (timerStartedAt !== null) {
            savedElapsedTime = Date.now() - timerStartedAt;
            timerStartedAt = null;
        }

        if (timerInterval !== null) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        renderTimer();
        return savedElapsedTime;
    }

    function applyColorTheme() {
        document.body.dataset.colorTheme = colorThemeSelect.value;
    }

    function renderSoundButton() {
        soundToggle.setAttribute('aria-pressed', String(soundIsEnabled));
        soundToggle.textContent = soundIsEnabled
            ? '🔊 Äänet päällä'
            : '🔇 Äänet pois';
    }

    function toggleSound() {
        soundIsEnabled = !soundIsEnabled;
        setSoundEnabled(soundIsEnabled);
        renderSoundButton();

        if (soundIsEnabled) {
            playFlipSound();
        }
    }

    function startNewGame() {
        const cardCount = Number.parseInt(cardCountSelect.value, 10);
        const cardTheme = cardThemeSelect.value;
        const totalPairs = cardCount / 2;

        resetTimer();
        attemptCount.textContent = '0';
        pairCount.textContent = `0 / ${totalPairs}`;
        gameStatus.textContent = 'Peli valmiina – ajastin käynnistyy ensimmäisestä kortista.';

        try {
            createBoard(cardCount, {
                cardTheme,
                onGameStart() {
                    startTimer();
                    gameStatus.textContent = 'Peli käynnissä – löydä kaikki parit!';
                },
                onCardFlip() {
                    playFlipSound();
                },
                onAttempt(attempts) {
                    attemptCount.textContent = attempts;
                },
                onMatch(matchedPairs, pairTotal) {
                    pairCount.textContent = `${matchedPairs} / ${pairTotal}`;

                    if (matchedPairs < pairTotal) {
                        playMatchSound();
                        gameStatus.textContent = 'Pari löytyi – jatka seuraavaan.';
                    }
                },
                onGameEnd({ attempts }) {
                    const finalTime = stopTimer();
                    playWinSound();
                    gameStatus.textContent =
                        `Voitit pelin ${attempts} yrityksellä ajassa `
                        + `${formatElapsedTime(finalTime)}! Aloita halutessasi uusi peli.`;
                }
            });
        } catch (error) {
            gameStatus.textContent = error.message;
        }
    }

    colorThemeSelect.addEventListener('change', applyColorTheme);
    soundToggle.addEventListener('click', toggleSound);
    newGameButton.addEventListener('click', startNewGame);

    applyColorTheme();
    setSoundEnabled(soundIsEnabled);
    renderSoundButton();
    startNewGame();
});
