function pvmlaskenta(Vl) {
  const Time =new Date(Vl);
  let t = "",m = "",p = "",k = "",y = "";
  let tunnit = parseInt(Time.getHours());
  if(tunnit<10) t="0" + tunnit.toString();
  else t=tunnit.toString();
  let minuutit = parseInt(Time.getMinutes());
  if(minuutit<10) m="0" + minuutit.toString();
  else m=minuutit.toString();
  let pv = parseInt(Time.getDate());
  if(pv<10) p="0" + pv.toString();
  else p=pv.toString();
  let kk = parseInt(Time.getMonth());
  if(kk<10) k="0" + kk.toString();
  else k=kk.toString();
  let yr = parseInt(Time.getFullYear());
  if(yr<10) y="0" + yr.toString();
  else y=yr.toString();
  let Aika = p + "." +
             k + "." +
             y + "&nbsp;&nbsp;&nbsp;" +
             t + ":" +
             m;
  return Aika;
}

function kklaskenta(Vl) {
  const Time =new Date(Vl);
  let Aika =Time.getMonth();
  return Aika;
}

function vvlaskenta(Vl) {
  const Time =new Date(Vl);
  let Aika =Time.getFullYear();
  return Aika;
}

function nollaaLS(a) {
  // esitellään muuttujat ja annetaan niihin alkuarvot
  let x = localStorage.getItem("vika"); // haetaan rekisteristä talletettujen kirjausten määrä
  let vr = "";                          // tallenteista luettu rivi; laskuri i kertoo monesko rivi
  let vl = [];                          // tallenne purettuna pilkulla erotettuihin lohkoihin (= taulukon arvoihin)
  let Nimi = "";                        // alustetaan muuttuja nimitiedolle (taulukon 1. arvo)
  let Aika = "";                        // alustetaan muuttuja käynnin aikatiedolle (taulukon 2. arvo)
  let poistettu = 0;                    // alustetaan muuttuja poistettu ja annetaan alkuarvo 0
  switch (a) {
    case 1: // Poistaa kaikki kirjaukset => tyhjentää rekisterin
      localStorage.clear();
      break;

    case 2: // poistaa viimeisen kuukauden kirjaukset
      let VikaKK = 0;
      for(var i=1; i<=x; i++){ // luodaan silmukka kaikille kirjauksille
        vr = localStorage.getItem(i);   // Haetaan tallennustilasta i -laskurin rivinumerolla olevaa arvoa
        vl = vr.split(",");             // hajotetaan arvo pilkulla erotettuihin ja tallennetaan ne vl -taulukkoon
        Nimi = vl[0];                   // Nimi -muuttuja saa arvoksi taulukon ensimmäisen arvon
        Aika = kklaskenta(parseInt(vl[1]));  // Aika -muuttujalle annetaan pvmlaskenta -funktiossa määritetty teksti
        //if(Aika[] == KK2) localStorage.removeItem(i);          // poistetaan kyseinen tallenne
        poistettu++;
      }
      /*x-=poistettu;
      localStorage.setItem("vika", x);  // Kirjotetaan tallennustilaan viimeisen tallennuksen järjestysnumero*/
      break;

    case 3: // Poistaa viimeisen vuoden kirjaukset
      let VikaVV = 0;
      break;

    case 4: // Poistaa kaikki kyseisen henkilön kirjaukset
      let Nimi2 = document.getElementById("inputti2").value;
      for(var i=1; i<=x; i++){ // luodaan silmukka kaikille kirjauksille
        vr = localStorage.getItem(i);   // Haetaan tallennustilasta i -laskurin rivinumerolla olevaa arvoa
        vl = vr.split(",");             // hajotetaan arvo pilkulla erotettuihin ja tallennetaan ne vl -taulukkoon
        Nimi = vl[0];                   // Nimi -muuttuja saa arvoksi taulukon ensimmäisen arvon
        if(Nimi == Nimi2) localStorage.removeItem(i);          // poistetaan kyseinen tallenne
        poistettu++;
      }
      /*x-=poistettu;
      localStorage.setItem("vika", x);  // Kirjotetaan tallennustilaan viimeisen tallennuksen järjestysnumero*/
    break
  }
}

function Styde(x) {
  if(x==1) document.getElementById("b1").style.background = "#ffb3ec";
  else if(x==2) document.getElementById("b2").style.background = "#ffb3ec";
}

function Back() {
  document.getElementById("b2").style.background = "#c3c388";
}

function Tiedostoon() {
  // Esitellään muuttujat
  let Name = document.getElementById('inputti').value;  // annetaan Name -muuttujalle alkuarvoksi HTML -sivulla annettu teksti
  const d = new Date();                             // esitellään d -muuttuja, jonka alkuarvona päivämäärä
  let Time  = d.getTime();                          // annetaan Time -muuttujalle arvoksi pitkä aika-arvo (sekuntien määrä 1.1.1970 alkaen)
  let Talteen = '"' + Name + '",' + Time;           // tallennettavaksi arvoksi koostetaan muuttujista koostuva merkkijono
  // alert(Talteen);
  let x = 0;                                        // esitellään muuttuja x alkuarvolla 0 (nolla)
  // annetaan alkuarvoksi tallennettu viimeistä arvoa vastaava arvo, jos se on olemassa
  if(parseInt(localStorage.getItem("vika")) >= 0) x = parseInt(localStorage.getItem("vika"))+1;
  //alert(x);
  localStorage.setItem(x, Talteen);                 // Kirjotetaan tallennustilaan nimi- ja aikatiedot
  localStorage.setItem("vika", x);                  // Kirjotetaan tallennustilaan viimeisen tallennuksen järjestysnumero
  location.reload();                                // Uudistetaan selainikkuna => tyhjennetään syöttöikkuna
}

function LueTiedostosta() {
  // Alustetaan muuttujat
  let max = 0;  // silmukan maksimiarvo; näytetään enintään 200 viimeisintä kävijää
  let min = 0;  // silmukan minimiarvo; lähdetään arvosta, joka saadaan vähentämällä kävijöiden maksimimäärästä 200
  let vr = "";  // tallenteista luettu rivi; laskuri i kertoo monesko rivi
  let vl = [];  // tallenne purettuna pilkulla erotettuihin lohkoihin (= taulukon arvoihin)
  let Nimi = ""; // alustetaan muuttuja nimitiedolle (taulukon 1. arvo)
  let Aika = ""; // alustetaan muuttuja käynnin aikatiedolle (taulukon 2. arvo)



  let Etsittava = document.getElementById('inputti').value;  // annetaan Etsittava -muuttujalle alkuarvoksi HTML -sivulla annettu teksti



  if(localStorage.getItem("vika")) max = localStorage.getItem("vika"); // annetaan maksimiarvoksi tallennettu arvo
  // alert();
  if(max > 200) min = max - 200; // jos taulukossa on enemmän kuin 200 arvoa => minimiarvoksi maksimi vähennettynä 200:lla
  // alert("min = " + min + ",  max = " + max);
  // Luodaan tulostettava taulukko ja annetaan sille alkuarvoksi otsikkotiedot ja määritetään taulukon leveydet
  let tulosta = "<table><tr><th style='width:220px'>Nimi</th><th style='width:73px'>Aika</th></tr>";
  // perustetaan silmukka; käytetään minimi ja maksimiarvoina aiemmin haettua ja laskettua arvoa
  for(var i = min;i <= max; i++) {
    vr = localStorage.getItem(i);   // Haetaan tallennustilasta i -laskurin rivinumerolla olevaa arvoa
    vl = vr.split(",");             // hajotetaan arvo pilkulla erotettuihin ja tallennetaan ne vl -taulukkoon
    Nimi = vl[0];                   // Nimi -muuttuja saa arvoksi taulukon ensimmäisen arvon
    Aika = pvmlaskenta(parseInt(vl[1]));  // Aika -muuttujalle annetaan pvmlaskenta -funktiossa määritetty teksti
    // tulosta -muuttujaan lisätään taulukon rivi, jossa esitetään kirjautmisen yhteydessä tallennetut nimi- ja aikatiedot
    tulosta += "<tr><td width='220px'>" + Nimi + "</td><td width='73px'>" + Aika + "</td></tr>";
  }
  // silmukan jälkeen viimeistellään taulukko tulostamista varten
  tulosta += "</table>";
  // alert("Tulosta = " + tulosta);
  // tulostetaan taulukko näyttöön sille HTML -koodissa p- ja id -koodeilla varattuun tilaan
  document.getElementById("ruudulle").innerHTML=tulosta;
}

function clickPress(event) {
  if (event.keyCode == 13) {
      Tiedostoon();
  }
}

function clickPress2(event) {
  if (event.keyCode == 13) {
      LueTiedostosta();
  }
}
