function poistaTiedot(toiminto,arvo) {
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
  let rivi=-1;
  let aika = 0;
  let nimi = "";
  tallenna = "";
  let nimet = ["Jari Kajanus",
               "Jukka Kuusisto",
               "Oona Hakkarainen",
               "Jukka Kolehmainen",
               "Virpi Vakka",
               "Seppo Junkkari",
               "Minna Kajanus",
               "Hanna Hakulinen",
               "Jerkku Jymy"
              ];
  for(let a in nimet) {
    rivi++;
    switch (rivi) {
      case 0:
      aika = + new Date(2022, 10, 24, 10, 33, 30, 180);
      break;
      case 1:
      aika = + new Date(2022, 0, 24, 10, 33, 30, 180);
      break;
      case 2:
      aika = + new Date(2022, 8, 24, 10, 33, 30, 180);
      break;
      case 3:
      aika = + new Date(2021, 8, 24, 10, 33, 30, 180);
      break;
      case 4:
      aika = + new Date(2021, 7, 24, 10, 33, 30, 180);
      break;
      case 5:
      aika = + new Date(2020, 11, 24, 10, 33, 30, 180);
      break;
      case 6:
      aika = + new Date(2020, 10, 24, 10, 33, 30, 180);
      break;
      case 7:
      aika = + new Date(2019, 11, 24, 10, 33, 30, 180);
      break;
      case 8:
      aika = + new Date(2019, 9, 24, 10, 33, 30, 180);
    }
    console.log("aika = " + aika + ", nimi = " + nimet[a]);
    localStorage.setItem(aika,nimet[a]);
  }
}
