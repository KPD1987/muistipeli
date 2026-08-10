// # MUUTOKSET JA LISÄYKSET
// - Lisätty lyhyt ääni kortin kääntämiselle.
// - Lisätty kahden sävelen ääni löydetylle parille.
// - Lisätty voittosointu viimeisen parin löytymiselle.
// - Äänet tuotetaan Web Audio API:lla ilman erillisiä äänitiedostoja.
// - Äänet voidaan ottaa käyttöön tai mykistää kesken pelin.

let audioContext = null;
let soundEnabled = true;

function getAudioContext() {
    if (!soundEnabled) return null;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;

    if (audioContext === null) {
        audioContext = new AudioContextClass();
    }

    if (audioContext.state === 'suspended') {
        audioContext.resume().catch(() => {});
    }

    return audioContext;
}

function playTone(frequency, duration, options = {}) {
    const context = getAudioContext();
    if (context === null) return;

    const {
        delay = 0,
        volume = 0.045,
        type = 'sine'
    } = options;

    const startTime = context.currentTime + delay;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);

    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.exponentialRampToValueAtTime(volume, startTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.02);
}

export function setSoundEnabled(enabled) {
    soundEnabled = Boolean(enabled);
}

export function playFlipSound() {
    playTone(480, 0.055, {
        volume: 0.035,
        type: 'triangle'
    });
}

export function playMatchSound() {
    playTone(660, 0.13, {
        volume: 0.045,
        type: 'sine'
    });
    playTone(880, 0.18, {
        delay: 0.09,
        volume: 0.05,
        type: 'sine'
    });
}

export function playWinSound() {
    const winningNotes = [523.25, 659.25, 783.99, 1046.5];

    winningNotes.forEach((frequency, index) => {
        playTone(frequency, 0.24, {
            delay: index * 0.1,
            volume: 0.05,
            type: 'triangle'
        });
    });
}
