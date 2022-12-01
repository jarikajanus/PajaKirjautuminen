function poistaTiedot(toimintosuiv) {
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
      sleep(2);
      location.reload();
      break;                                                            // switch-case -osion suorittaminen lopetetaan

   case 3: // "puhdistaa pöydän" eli tekee reloadin
     location.reload();
     break;
  }
}

function tayta() {
  let rivi=-1;
  let aika = 0;
  let nimi = "";
  tallenna = "";
  let nimet = ["Eetu Vainionpää",
               "Joona Mannerkivi",
               "Hozan Hasan",
               "Leonardo Lind",
               "Jussi Hämäläinen",
               "Joona Mannerkivi",
               "Hozan Hasan",
               "Sari Ollila"
              ];
  for(let a in nimet) {
    rivi++;
    switch (rivi) {
      case 0:
      aika = + new Date(2022, 5, 21, 11, 20, 30, 180);
      break;
      case 1:
      aika = + new Date(2022, 5, 16, 8, 45, 30, 180);
      break;
      case 2:
      aika = + new Date(2022, 5, 15, 12, 16, 30, 180);
      break;
      case 3:
      aika = + new Date(2022, 5, 15, 10, 3, 30, 180);
      break;
      case 4:
      aika = + new Date(2022, 5, 15, 9, 43, 30, 180);
      break;
      case 5:
      aika = + new Date(2022, 5, 15, 8, 48, 30, 180);
      break;
      case 6:
      aika = + new Date(2022, 5, 14, 13, 48, 30, 180);
      break;
      case 7:
      aika = + new Date(2022, 5, 14, 13, 16, 30, 180);
      break;
    }
    console.log("aika = " + aika + ", nimi = " + nimet[a]);
    localStorage.setItem(aika,nimet[a]);
  }
}
