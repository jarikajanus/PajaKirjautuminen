// Muuttaa kahden sanan ensimmäiset kirjaimet isoiksi, muuten pieniä
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 1.
// tiedostoon kirjoitus
function Kirjoita(nimet) {
  // Esitellään muuttujat
  name = nimet.toLowerCase();
  const IsotName = name.split(' ').map(capitalize).join(' '); // muutetaan ekat sanat alkamaan isolla kirjaimella
  const d = new Date();                                 // esitellään d -muuttuja, jonka alkuarvona päivämäärä
  let time  = d.getTime();                              // annetaan Time -muuttujalle arvoksi pitkä aika-arvo (millisekuntien määrä 1.1.1970 alkaen)
  let talteen = IsotName + ',' + time;                 // tallennettavaksi arvoksi koostetaan muuttujista koostuva merkkijono
  let x = 0;                                           // esitellään muuttuja x alkuarvolla 0 (nolla)
  // annetaan alkuarvoksi tallennettu viimeistä arvoa vastaava arvo, jos se on olemassa
  if(parseInt(localStorage.getItem("vika")) >= 0) x = parseInt(localStorage.getItem("vika"))+1;
  localStorage.setItem(x, talteen);                 // Kirjotetaan tallennustilaan nimi- ja aikatiedot
  localStorage.setItem("vika", x);                  // Kirjotetaan tallennustilaan viimeisen tallennuksen järjestysnumero
  //kirjoitaLevylle(Talteen);                         // Kutsutaan funktio, joka kirjoittaa tiedon tiedostoon
  location.reload();                                // Uudistetaan selainikkuna => tyhjennetään syöttöikkuna
  document.getElementById('inputti').focus();
}

// tietojen haku kirjautumissivulta
function KeraaTiedot() {
  let kirjoitettu = document.getElementById('inputti').value;
  let kaksi = true;
  let tat = true;
  let sukunimi = false;
  let iov = kirjoitettu.indexOf(" ");
  let pit = kirjoitettu.length;
  if(!kirjoitettu.includes("täytä")) tat = false;
  if(!kirjoitettu.includes(" ")) kaksi = false;
  if(kaksi && pit > iov+2) sukunimi = true;
  if(pit > 4){
    if(tat && kaksi) {
      alert("Nyt en ymmärrä, yritä uudelleen");     // VIRHE, jos käyttäjä yrittää täyttää rekisterin ja lisää tekstiin välilyönnin
    }
    else if(!tat && !kaksi && !sukunimi) {
      alert("Nyt en ymmärrä, yritä uudelleen (sukunimi puuttuu))");     // VIRHE, jos käyttäjä yrittää täyttää rekisterin ei lisää välilyöntiä ja sukunime
    }
    else if(tat && !kaksi) tayta();                 // Ei virhettä, käynnistetään täyttöprosessi
    else if (!tat && kaksi && !sukunimi) {
      alert("Nyt en ymmärrä, yritä uudelleen (sukunimi puuttuu)");     // VIRHE, jos käyttäjä yrittää täyttää rekisterin ei lisää välilyöntiä ja sukunime
    }
    else if(!tat && kaksi && sukunimi) Kirjoita(kirjoitettu);   // Ei virhettä, kirjoitetaan rekisteriin
  }
  else if(pit > 0 && pit <= 4) {
    alert("Really? Yritä uudelleen");               // VIRHE, jos pituus on suurempi kuin 0 mutta jää silti neljään merkkiin
  }
}

// 2.
// Hakutietojen tarkastus
function tarkastaNimi(vl) {
  const sivulta = document.getElementById('ruska').value.toLowerCase(); // muutetaan kaikki kirjaimet pieniksi
  const IsotSivulta = sivulta.split(' ').map(capitalize).join(' ');     // muutetaan ekat sanat alkamaan isolla kirjaimella
  for(var i = 0; i < vl.length; i++) {                                  // tarkastetaan, onko syötetty nimi jo rekisterissä
    if(vl == IsotSivulta || sivulta == "" || sivulta == '""') return true;
    else return false;
  }
}

// Hakutiedot tiedostosta ruudulle
function LueTiedostosta() {
  // Alustetaan muuttujat
  let max = 0;   // silmukan maksimiarvo
  let min = 0;   // silmukan minimiarvo
  let vr = "";   // tallenteista luettu rivi
  let vl = [];   // tallenne purettuna pilkulla erotettuihin lohkoihin (= taulukon arvoihin); 0 = nimi, 1 = aikaleima
  let nimi = ""; // alustetaan muuttuja nimitiedolle (taulukon 1. arvo)
  let aika = ""; // alustetaan muuttuja käynnin aikatiedolle (taulukon 2. arvo)
  if(localStorage.getItem("vika")) max = localStorage.getItem("vika"); // annetaan maksimiarvoksi tallennettu arvo
  // perustetaan silmukka; käytetään minimi ja maksimiarvoina aiemmin haettua ja laskettua arvoa
  if(max >= 0) {
    // Luodaan tulostettava taulukko ja annetaan sille alkuarvoksi otsikkotiedot ja määritetään taulukon leveydet
    let teksti = "Lista lähetetty!";
    let tulosta = '<div><td><button type="button" class="ball b5" id="b5" onmouseover="Styde(5)" onmouseout="Back(5)" onClick="sendEmail(' + teksti + ')">Lista/merkityt s-postiin</button></td>';
    tulosta += "</div><div class='tulostus'>";
    //tulosta += "</div><div class='tulostus'>";
    tulosta += "<table><tr><th style='width:220px'>Nimi</th><th style='width:73px'>Aika</th><th style='width:25px'>Poista?</th></tr>";
    for(var i = max;i >= min; i--) {
      vr = localStorage.getItem(i);   // Haetaan tallennustilasta i -laskurin rivinumerolla olevaa arvoa
      vl = vr.split(",");             // hajotetaan arvo pilkulla erotettuihin ja tallennetaan ne vl -taulukkoon
      nimi = '"' + vl[0] + '"';             // nimi -muuttuja saa arvoksi taulukon ensimmäisen arvon
      aika = pvmlaskenta(parseInt(vl[1]));  // aika -muuttujalle annetaan pvmlaskenta -funktiossa määritetty teksti
      // tulosta -muuttujaan lisätään taulukon rivi, jossa esitetään kirjautumisen yhteydessä tallennetut nimi- ja aikatiedot
      if(tarkastaNimi(vl[0])) tulosta += "<tr><td width='220px'>" + nimi + "</td><td width='73px'>" + aika
        + "</td><td><input type='checkbox' name='T" + i + "'></td></tr>";
    }
    tulosta += '</table></div>';
    // tulostetaan taulukko näyttöön sille HTML -koodissa p- ja id -koodeilla varattuun tilaan
    document.getElementById("ruudulle").innerHTML=tulosta;
    // "nollataan" sivujen syöttöruudut
    document.getElementById("ruska").value="";
    document.getElementById("inputti").focus;
  }
}

function listaaVuodet() {
  const tulosta2 = [];                                                              // esitellään taulukko
  let ruudulle = "<div class='tulostus'>";                                          // esitellään tulostattava tekstimuuttuja
  ruudulle += "<table><tr><th style='width:220px'>Vuosi</th><th style='width:25px'>Poista?</th></tr>";
  let max = 0;                                                                      // esitellään silmukan maksimiarvo
  let vr = "";                                                                      // esitellään muuttuja tallenteista luettua riviä varten
  if(localStorage.getItem("vika")) max = localStorage.getItem("vika");              // annetaan maksimiarvoksi tallennettu arvo
  for(let i=0; i<=max; i++) {
    vr = localStorage.getItem(i);                                                   // Haetaan tallennustilasta i -laskurin rivinumerolla olevaa arvoa
    vl = vr.split(",");                                                             // hajotetaan arvo pilkulla erotettuihin ja tallennetaan ne vl -taulukkoon
    aika = vvlaskenta(parseInt(vl[1]));                                             // aika -muuttujalle annetaan pvmlaskenta -funktiossa määritetty teksti
    //alert(aika);
    if(!tulosta2.includes(aika)) tulosta2.push(aika);                               // lisätään vuosi luetteloon jos soitä ei vielä ole
  }
  tulosta2.sort();
  for(let i=0; i<tulosta2.length; i++) {
    ruudulle += "<tr><td width='220px'>" + tulosta2[i].toString()
      + "</td><td><input type='checkbox' name='P" + i + "'></td></tr>";
  }
  ruudulle += '</table></div>';
  document.getElementById("ruudulle2").innerHTML = ruudulle;
}
