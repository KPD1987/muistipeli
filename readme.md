# Muistipelin korjattu versio, jossa on tehty kaikki tehtävän mukaiset ongelmien korjaukset

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


# Ongelmat, jotka korjattu:

- Korttien kääntämisen logiikka: Jos pelaaja yrittää kääntää saman kortin kahdesti, se ei pitäisi laskea yritykseksi. Tällä hetkellä koodi ei tarkista tätä tilannetta.
- Korttien kääntämisen estäminen: Jos kaksi korttia on jo käännetty, pelaajan ei pitäisi pystyä kääntämään lisää kortteja ennen kuin nykyiset kortit on käännetty takaisin tai poistettu pelistä.
- Pelin uudelleenkäynnistys: Pelissä ei ole toiminnallisuutta, joka mahdollistaisi pelin uudelleenkäynnistyksen ilman sivun uudelleenlatausta.
- Korttien satunnainen järjestys: Korttien järjestys ei välttämättä ole tarpeeksi satunnainen, mikä voi tehdä pelistä ennakoitavan.
- Visuaaliset ja käytettävyysongelmat: Korttien ulkoasu ja pelilaudan asettelu eivät välttämättä ole optimaalisia kaikenkokoisilla näytöillä.
- Pelin lopetuksen logiikka: Pelin lopetuksen logiikka ei välttämättä toimi oikein kaikissa tilanteissa, esimerkiksi jos pelaaja kääntää viimeiset kaksi korttia nopeasti peräkkäin.

- Ylläolevista ongelmista on myös tehty erilliset "Issues" merkinnät ja ne on myös muutosten tekemisen jälkeen siirretty "Done" kohtaan.

# Parannusehdotukset, jotka tehty

- Tee tyylikkäämpi tapa valita pelin korttien määrä: Nyt pelin korttien määrä annetaan promptilla, mutta voit tehdä siihen esimerkiksi valikkovalinnan.
- Pelin lopetus ja tulosten näyttäminen: Lisää toiminnallisuus, joka ilmoittaa pelaajalle, kun kaikki parit on löydetty, ja näyttää kuinka monta yritystä siihen kului.
- Aikaseuranta: Lisää ajastin, joka seuraa kuinka kauan pelaajalta kestää löytää kaikki parit.
- Korttien kuvien lisääminen: Käytä oikeita kuvia korttien symboleina sen sijaan, että käytetään emoji-symboleja.
- Responsiivisuus: Tee pelistä responsiivinen, jotta se toimii hyvin eri kokoisilla näytöillä.
- Ääniefektit: Lisää ääniefektejä, kun kortteja käännetään ja pareja löydetään.
- Teeman vaihtaminen: Lisää mahdollisuus vaihtaa pelin teemaa (esim. eri korttikuvat ja taustavärit).


# Parannusehdotuksia, joita EI ole vielä tehty, löytyvät myöskin "Issues" tabin alta korvamerkittyinä:

- Pisteytysjärjestelmä: Lisää pisteytysjärjestelmä, joka perustuu esimerkiksi yritysten määrään ja käytettyyn aikaan.

# Alkuperäiset tehtävän tiedostot löytyvät "Main" branchin alta vielä toistaiseksi.
