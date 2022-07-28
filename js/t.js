function poistaTiedot(a) {
  // esitellään muuttujat ja annetaan niihin alkuarvot
  let x = localStorage.getItem("vika"); // haetaan rekisteristä talletettujen kirjausten määrä
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

    case 2: // poistaa viimeisen kuukauden kirjaukset
      let vikaKK = 0;
      for(var i=1; i<=x; i++){              // luodaan silmukka kaikille kirjauksille
        vr = localStorage.getItem(i);       // Haetaan tallennustilasta i -laskurin rivinumerolla olevaa arvoa
        vl = vr.split(",");                 // hajotetaan arvo pilkulla erotettuihin ja tallennetaan ne vl -taulukkoon
        nimi = vl[0];                       // Nimi -muuttuja saa arvoksi taulukon ensimmäisen arvon
        aika = kklaskenta(parseInt(vl[1]));  // Aika -muuttujalle annetaan pvmlaskenta -funktiossa määritetty teksti
        //if(Aika[] == KK2) localStorage.removeItem(i);          // poistetaan kyseinen tallenne
        poistettu++;
      }
      /*x-=poistettu;
      localStorage.setItem("vika", x);  // Kirjotetaan tallennustilaan viimeisen tallennuksen järjestysnumero*/
      break;

    case 3: // Poistaa viimeisen vuoden kirjaukset
      let vikaVV = 0;
      break;

    case 4: // Poistaa kaikki kyseisen henkilön kirjaukset
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
      /*x-=poistettu;
      localStorage.setItem("vika", x);  // Kirjotetaan tallennustilaan viimeisen tallennuksen järjestysnumero*/
      break;
  }
}

function tayta() {
  let x1=0;x2=0;
  let text = "";
  if(parseInt(localStorage.getItem("vika")) >= 0) x1 = parseInt(localStorage.getItem("vika"))+1;
  x2 = + new Date(2018, 11, 24, 10, 33, 30, 180);
  text = "Jari Kajanus," + x2;
  console.log("x1 = "+x1+", text = " + text);
  localStorage.setItem(x1,text);

  x1++;
  x2 = + new Date(2019, 11, 24, 10, 33, 30, 180);
  text = "Jukka Kuusisto," + x2;
  console.log("x1 = "+x1+", text = " + text);
  localStorage.setItem(x1,text);

  x1++;
  x2 = + new Date(2019, 10, 24, 10, 33, 30, 180);
  text = "Oona Hakkarainen," + x2;
  console.log("x1 = "+x1+", text = " + text);
  localStorage.setItem(x1,text);

  x1++;
  x2 = + new Date(2017, 10, 24, 10, 33, 30, 180);
  text = "Jukka Kolehmainen," + x2;
  console.log("x1 = "+x1+", text = " + text);
  localStorage.setItem(x1,text);

  x1++;
  x2 = + new Date(2017, 10, 24, 10, 33, 30, 180);
  text = "Virpi Vakka," + x2;
  console.log("x1 = "+x1+", text = " + text);
  localStorage.setItem(x1,text);

  x1++;
  x2 = + new Date(2016, 10, 24, 10, 33, 30, 180);
  text = "Seppo Junkkari," + x2;
  console.log("x1 = "+x1+", text = " + text);
  localStorage.setItem(x1,text);

  x1++;
  x2 = + new Date(2016, 10, 24, 10, 33, 30, 180);
  text = "Minna Kajanus," + x2;
  console.log("x1 = "+x1+", text = " + text);
  localStorage.setItem(x1,text);

  x1++;
  x2 = + new Date(2022, 10, 24, 10, 33, 30, 180);
  text = "Hanna Hakulinen," + x2;
  console.log("x1 = "+x1+", text = " + text);
  localStorage.setItem(x1,text);

  x1++;
  x2 = + new Date(2022, 10, 24, 10, 33, 30, 180);
  text = "Jerkku Jymy," + x2;
  console.log("x1 = "+x1+", text = " + text);

  localStorage.setItem("vika", x1);
}
