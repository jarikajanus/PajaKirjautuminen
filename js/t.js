function poistaTiedot(a) {
  // esitellään muuttujat ja annetaan niihin alkuarvot
  let vr = "";                          // tallenteista luettu rivi; laskuri i kertoo monesko rivi
  let vl = [];                          // tallenne purettuna pilkulla erotettuihin lohkoihin (= taulukon arvoihin)
  let nimi = "";                        // alustetaan muuttuja nimitiedolle (taulukon 1. arvo)
  let aika = "";                        // alustetaan muuttuja käynnin aikatiedolle (taulukon 2. arvo)
  let poistettu = 0;                    // alustetaan muuttuja poistettu ja annetaan alkuarvo 0
  switch (a) {

    case 1: // Poistaa kaikki kirjaukset => tyhjentää rekisterin
      if(confirm("Haluatko varmasti tyhjentää listan kirjautuneista?")) {
        localStorage.clear();
        location.reload();
      }
      break;

    case 2: // Poistaa valitun vuoden kirjaukset
      let vikaVV = 0;
      break;
// tarkastetan onko checkbox rastitettu
      /*
      var pass = true;

      for (var i = 0; i < form.elements.length; i++ )
      {
          if (form.elements[i].type == 'checkbox')
          {
              if (form.elements[i].checked == false)
              {
                  pass = false;
              }
          }
      }

      if(!pass)
      {
          alert ('You must check all the checkboxes!');
      }

      return pass;
*/

    case 3: // Poistaa kaikki kyseisen henkilön kirjaukset
      let Nimi2 = document.getElementById("inputti2").value;
      for(var i=1; i<=x; i++){          // luodaan silmukka kaikille kirjauksille
        vr = localStorage.getItem(i);   // Haetaan tallennustilasta i -laskurin rivinumerolla olevaa arvoa
        vl = vr.split(",");             // hajotetaan arvo pilkulla erotettuihin ja tallennetaan ne vl -taulukkoon
        Nimi = vl[0];                   // Nimi -muuttuja saa arvoksi taulukon ensimmäisen arvon
        if(Nimi == Nimi2) {
          localStorage.removeItem(i);          // poistetaan kyseinen tallenne
          poistettu++;
        }
      }
      break;
  }
}

function tayta() {
  let rivi=-1;
  let aika = 0;
  let nimi = ""; tallenna = "";
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
      aika = + new Date(2022, 9, 24, 10, 33, 30, 180);
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
      aika = + new Date(2020, 12, 24, 10, 33, 30, 180);
      break;
      case 6:
      aika = + new Date(2020, 11, 24, 10, 33, 30, 180);
      break;
      case 7:
      aika = + new Date(2019, 12, 24, 10, 33, 30, 180);
      break;
      case 8:
      aika = + new Date(2019, 10, 24, 10, 33, 30, 180);
    }
    console.log("aika = " + aika + ", nimi = " + nimet[a]);
    localStorage.setItem(aika,nimet[a]);
  }
  location.reload();
}
