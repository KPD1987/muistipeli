# Muistipeli

Tässä repositoryssa on toteutettu yksinkertainen muistipeli JavaScriptillä. 

- Pelin alussa on käytössä 16 korttia, jotka on asetettu kuvapuoli alaspäin.
- Pelaaja voi kääntää kaksi korttia kerrallaan.
- Jos kortit ovat pari, ne jäävät kuvapuoli ylöspäin.
- Jos kortit eivät ole pari, ne käännetään takaisin kuvapuoli alaspäin.
- Peli jatkuu, kunnes kaikki parit on löydetty.


## Moduulien käyttö

Koodi on organisoitu seuraaviin moduuleihin:

- `game.js`: Pelin aloitus ja päälogiikka.
- `board.js`: Pelilaudan luominen ja korttien käsittely.
- `card.js`: Korttien luominen ja kääntäminen.
