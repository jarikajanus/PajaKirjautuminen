function poistaTiedot(toiminto) {
  // esitellään muuttujat ja annetaan niihin alkuarvot
  let vr = "";                          // tallenteista luettu rivi; laskuri i kertoo monesko rivi
  let vl = [];                          // tallenne purettuna pilkulla erotettuihin lohkoihin (= taulukon arvoihin)
  let nimi = "";                        // alustetaan muuttuja nimitiedolle (taulukon 1. arvo)
  let aika = "";                        // alustetaan muuttuja käynnin aikatiedolle (taulukon 2. arvo)
  let laskuri = 0;                      // alustetaan muuttuja paikallisen tietovarasto läpikäyntiä varten
  switch(toiminto) {
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
  let c = 0;
  let nimi = "";
  let aika = "";
  let aika2 = "";
  let kk = 0;
  for(c = 1; c < 21; c++) {
    kk++;
    if(kk>12) kk=1;
    nimi = c+"_Oppilas";
    aika = new Date(2022, kk, c, 10, 33, 30, 180);
    aika2 = Date.parse(aika);
    console.log("aika = " + aika2 + ", nimi = " + nimi);
    localStorage.setItem(aika2,nimi);
  }
  for(c = 21; c < 42; c++) {
    kk++;
    if(kk>12) kk=1;
    nimi = c+"_Oppilas";
    aika = new Date(2023, c, kk, 10, 33, 30, 180);
    aika2 = Date.parse(aika);
    console.log("aika = " + aika2 + ", nimi = " + nimi);
    localStorage.setItem(aika2,nimi);
  }
}

//let ms = Date.parse("March 21, 2012");
/*
function tayta() {
  let rivi=-1;
  let aika = 0;
  let nimi = "";
  tallenna = "";
  let nimet = ["Opiskelija_1",
               "Opiskelija_2",
               "Opiskelija_3",
               "Opiskelija_4",
               "Opiskelija_5",
               "Opiskelija_6",
               "Opiskelija_7",
               "Opiskelija_8",
               "Opiskelija_9",
               "Opiskelija_10",
               "Opiskelija_11",
               "Opiskelija_12",
               "Opiskelija_13",
               "Opiskelija_14",
               "Opiskelija_15",
               "Opiskelija_16",
               "Opiskelija_17",
               "Opiskelija_18",
               "Opiskelija_19"
              ];
  for(let a in nimet) {
    rivi++;
    switch (rivi) {
      case 0:
      aika = + new Date(2022, 1, 21, 11, 20, 30, 180);
      break;
      case 1:
      aika = + new Date(2022, 2, 16, 8, 45, 30, 180);
      break;
      case 2:
      aika = + new Date(2022, 3, 15, 12, 16, 30, 180);
      break;
      case 3:
      aika = + new Date(2022, 4, 15, 10, 3, 30, 180);
      break;
      case 4:
      aika = + new Date(2022, 5, 15, 9, 43, 30, 180);
      break;
      case 5:
      aika = + new Date(2022, 6, 15, 8, 48, 30, 180);
      break;
      case 6:
      aika = + new Date(2022, 7, 14, 13, 48, 30, 180);
      break;
      case 7:
      aika = + new Date(2022, 8, 14, 13, 16, 30, 180);
      break;
      case 8:
      aika = + new Date(2022, 9, 14, 13, 16, 30, 180);
      break;
      case 9:
      aika = + new Date(2022, 10, 14, 13, 16, 30, 180);
      break;
      case 10:
      aika = + new Date(2022, 11, 14, 13, 16, 30, 180);
      break;
      case 11:
      aika = + new Date(2022, 12, 14, 13, 16, 30, 180);
      break;
      case 12:
      aika = + new Date(2022, 1, 14, 13, 16, 30, 180);
      break;
      case 13:
      aika = + new Date(2023, 1, 14, 13, 16, 30, 180);
      break;
      case 14:
      aika = + new Date(2023, 2, 14, 13, 16, 30, 180);
      break;
      case 15:
      aika = + new Date(2023, 3, 14, 13, 16, 30, 180);
      break;
      case 16:
      aika = + new Date(2023, 4, 14, 13, 16, 30, 180);
      break;
      case 17:
      aika = + new Date(2023, 5, 14, 13, 16, 30, 180);
      break;
      case 18:
      aika = + new Date(2024, 1, 14, 13, 16, 30, 180);
      break;
      case 19:
      aika = + new Date(2024, 2, 14, 13, 16, 30, 180);
      break;
    }
    //console.log("aika = " + aika + ", nimi = " + nimet[a]);
    if(localStorage.setItem(aika,nimet[a])) console.log("aika = " + aika + ", nimi = " + nimet[a]);
  }
}*/
