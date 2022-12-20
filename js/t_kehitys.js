function poistaTiedot(toiminto) {
  // esitellään muuttujat ja annetaan niihin alkuarvot
  let vr = "";                          // tallenteista luettu rivi; laskuri i kertoo monesko rivi
  let vl = [];                          // tallenne purettuna pilkulla erotettuihin lohkoihin (= taulukon arvoihin)
  let nimi = "";                        // alustetaan muuttuja nimitiedolle (taulukon 1. arvo)
  let aika = "";                        // alustetaan muuttuja käynnin aikatiedolle (taulukon 2. arvo)
  let laskuri = 0;                      // alustetaan muuttuja paikallisen tietovarasto läpikäyntiä varten
  switch (toiminto) {
    case 1: // Poistaa kaikki kirjaukset => tyhjentää rekisterin
      if(confirm("Haluatko varmasti tyhjentää listan kirjautuneista?")) {
        localStorage.clear();
        location.reload();
      }
      break;

    case 2: // Poistaa kaikki valitun oppilaan kirjaukset
      let totuus = true;
      let viesti1 = ""; let viesti2 = "";
      const oppilas = document.getElementById('ruska').value;           // luetaan oppilaan nimi ruudulta
      const IsotSivulta = oppilas.split(' ').map(capitalize).join(' '); // muutetaan ekat sanat alkamaan isolla kirjaimella
      if(confirm("Haluatko varmasti poistaa oppilaan " + IsotSivulta + " kaikki kirjaukset?")) {
        do {                                                            // Aloitetaan silmukka arvojen haulle localStoragesta
            if(avain = localStorage.key(laskuri)) {                     // seuraavaa tietuetta vastaava avain localStoragesta
              vr = localStorage.getItem(avain);                         // haetaan varastosta avainta vastaava nimi
              if(vr == IsotSivulta) {                                   // Tarkastetaan, onko oppilas rekisterissä
                localStorage.removeItem(avain);                         // Poistetaan rekisteristä vastaava oppilas
                laskuri = -1;                                           // Nollataan laskuri
              }
              laskuri++;                                                // lisätään laskurin arvoa seuraavalle kierrokselle
            }
            else totuus = false;                                        // asetetaan silmukka päättymään, jos localStorage on käyty loppuun
          }
        while(totuus);                                                  // silmukkaa pyöritetään niin kauan, kun totuus -muuttujassa on arvo "true"
      }
      break;                                                            // switch-case -osion suorittaminen lopetetaan
  }
}

function tayta() {
  let c = 0;
  let nimi = "";
  let aika = "";
  let kk = 0;
  for(c = 1; c < 21; c++) {
    kk++;
    if(kk>12) kk=1;
    nimi = "Oppilas_" + c;
    aika = new Date(2022, kk, c, 10, 33, 30, 180);
    console.log("aika = " + aika + ", nimi = " + nimi);
    localStorage.setItem(aika,nimi);
  }
  for(c = 21; c < 42; c++) {
    kk++;
    if(kk>12) kk=1;
    nimi = "Oppilas_" + c;
    aika = new Date(2023, c, kk, 10, 33, 30, 180);
    console.log("aika = " + aika + ", nimi = " + nimi);
    localStorage.setItem(aika,nimi);
  }
}
