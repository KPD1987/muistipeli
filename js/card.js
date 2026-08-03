// # MUUTOKSET JA LISÄYKSET
// - Kortti on nyt saavutettava button-elementti, jossa on erillinen etu- ja takapuoli.
// - Kääntö-, palautus- ja pariksi merkitsemisen toiminnot on erotettu toisistaan.
// - Jo käännettyä tai löydettyä korttia ei voi käsitellä uudelleen.

export function createCardElement(card, index) {
    const cardElement = document.createElement('button');
    const hiddenFace = document.createElement('span');
    const visibleFace = document.createElement('span');

    cardElement.type = 'button';
    cardElement.classList.add('card');
    cardElement.dataset.card = card;
    cardElement.dataset.index = index;
    cardElement.setAttribute('aria-label', `Kortti ${index + 1}: kääntämättä`);

    hiddenFace.classList.add('card__face', 'card__back');
    hiddenFace.setAttribute('aria-hidden', 'true');
    hiddenFace.textContent = '?';

    visibleFace.classList.add('card__face', 'card__front');
    visibleFace.setAttribute('aria-hidden', 'true');
    visibleFace.textContent = card;

    cardElement.append(hiddenFace, visibleFace);
    return cardElement;
}

export function flipCard(cardElement) {
    const cannotFlip = cardElement.disabled
        || cardElement.classList.contains('flipped')
        || cardElement.classList.contains('matched');

    if (cannotFlip) return false;

    cardElement.classList.add('flipped');
    cardElement.setAttribute(
        'aria-label',
        `Kortti ${Number(cardElement.dataset.index) + 1}: ${cardElement.dataset.card}`
    );
    return true;
}

export function hideCard(cardElement) {
    cardElement.classList.remove('flipped');
    cardElement.setAttribute(
        'aria-label',
        `Kortti ${Number(cardElement.dataset.index) + 1}: kääntämättä`
    );
}

export function markCardAsMatched(cardElement) {
    cardElement.classList.add('matched');
    cardElement.disabled = true;
    cardElement.setAttribute('aria-label', `Löydetty pari: ${cardElement.dataset.card}`);
}
