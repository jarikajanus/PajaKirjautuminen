// asetetaan systeemi odottamaan aika -muuttujassa määritelty sekuntimäärä ja ladataan ikkuna uudelleen sen jälkeen
function sleep(aika) {
    aika = aika * 1000;                  // muutetaan sekunnit millisekunneiksi
    setTimeout(function(){
        location.reload();               // Uudistetaan selainikkuna => tyhjennetään syöttöikkuna
    }, aika);
  }

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
  const d = new Date();                                       // esitellään d -muuttuja, jonka alkuarvona päivämäärä
  let time  = d.getTime();                                    // annetaan Time -muuttujalle arvoksi pitkä aika-arvo (millisekuntien määrä 1.1.1970 alkaen)
  // annetaan alkuarvoksi tallennettu viimeistä arvoa vastaava arvo, jos se on olemassa
  localStorage.setItem(time, IsotName);                       // Kirjotetaan tallennustilaan nimi- ja aikatiedot
}

// tietojen haku kirjautumissivulta
function KeraaTiedot() {
  let kirjoitettu = document.getElementById('inputti').value; // Haetaan sivulta käyttäjän kirjoittama teksti elementistä 'inputti'
  let virheteksti = "";                                       // alustetaan virheteksti ja annetaan alkuarvoksi tyhjä merkkijono
  let kaksi = true;                                           // alustetaan boolean -tyyppimnen muuttuja ja annetaan alkuarvo 'true'
  let tat = true;                                             // -''-
  let sukunimi = false;                                       // -''-
  let iov = kirjoitettu.indexOf(" ");                         // Haetaan muuttujaan iov kirjoitettu -muuttujassa olevan välilyönnin indeksi
  let pit = kirjoitettu.length;                               // Haetaan muuttujaan pit kirjoitettu -muuttujassa olevan tekstin pituus
  if(!kirjoitettu.includes("täytä")) tat = false;             // Tarkastetaan, onko kirjoitettu sana "täytä": on => tat = false
  if(!kirjoitettu.includes(" ")) kaksi = false;               // Tarkastetaan, onko kirjoitettu välilyönti: on => kaksi = false
  if(kaksi && pit > iov+2) sukunimi = true;                   // Jos on välilyönti ja pituus on suurempi, kuin kaksi välilyntiä, sukunimi on olemassa
  if(pit > 4){                                                // Jos kirjoitetun teksin pituus on enemmän kuin 4, aloitetaan!
    if(tat && kaksi) {                                        // Jos tekstissä ei ole sanaa "täytä" ja jos on syötetty kaksi sanaa välilyönnillä erotettuina, aloitetaan!
      virheteksti += "Sana 'täytä' ja välilyönti samaan aikaan ei ole sallittua!";
    }
    else if(!tat && !kaksi && !sukunimi) {                    // Jos tekstissä ei ole sanaa 'täyttö' eikä välilyöntiä eikä sukunimeä
      virheteksti += "Sukunimi puuttuu...";
    }
    else if(tat && !kaksi) {
      tayta();                                                // Ei virhettä, käynnistetään täyttöprosessi
      virheteksti = "Täyttö tehty.";
    }
    else if (!tat && kaksi && !sukunimi) {                    // Jos tekstissä ei ole sanaa 'täyttö' mutta välilyönti on ilman sukunimeä
      virheteksti += "Sukunimi puuttuu...";
    }
    else if(!tat && kaksi && sukunimi) {
      Kirjoita(kirjoitettu);                                  // Ei virhettä, kirjoitetaan rekisteriinname = nimet.toLowerCase();
      kirjoitettu = kirjoitettu.toLowerCase();
      const IsotName = kirjoitettu.split(' ').map(capitalize).join(' '); // muutetaan ekat sanat alkamaan isolla kirjaimella
      virheteksti = "Tervetuloa Pajaan, " + IsotName + "!";
    }
  }
  else if(pit > 0 && pit <= 4) {                              // VIRHE, jos pituus on suurempi kuin 0 mutta jää silti neljään merkkiin
    virheteksti += "Vain alle 5 merkkiä? Yritä uudelleen...";
  }
  document.getElementById('virhetieto').innerHTML=virheteksti;
  sleep(5);
  document.getElementById('inputti').focus();
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
//function lueTiedostosta() {
function lueTiedostosta() {
  // Alustetaan muuttujat
  let laskuri = 0;
  let tot = true;                                              // silmukan minimiarvo
  let vr = [];                                                 // nimestä ja ajasta saatu taulukko
  let nimi = "";                                               // alustetaan muuttuja nimitiedolle
  let aika = "";                                               // alustetaan muuttuja käynnin aikatiedolle
  let vuosi = "";                                              // esitellään vuosi -muuttuja
  let tulosta = "</div><div class='tulostus'>";                // esitellään kirjautuneiden luettelo
  tulosta += "<table><tr><th style='width:400px'>Nimi</th><th style='width:100px'>Aika</th></tr>";
  let ruudulle = "<div class='tulostus'>";                     // esitellään vuosien luettelo
  ruudulle += "<table><tr><th style='width:220px'>Vuosi</th></tr>";
  const vuosiLuettelo = [];                                    // esitellään vuosilukujen taulukko
  const nimet_a = [];                                          // Luodaan taulukko a (lajiteltu nimen nukaan)
  let avain = "";
  // perustetaan silmukka; käytetään minimi ja maksimiarvoina aiemmin haettua ja laskettua arvoa
  // haetaan arvot ja tallennetaan ne taulukoihin
  do {
    if(avain = localStorage.key(laskuri)) {                    // Haetaan localStoragesta seuraava avain
      nimi = localStorage.getItem(avain);                      // nimi -muuttuja saa arvoksi taulukon arvon
      aika = pvmlaskenta(parseInt(avain));                     // aika -muuttujalle annetaan pvmlaskenta -funktiossa määritetty numero
      vuosi = vvlaskenta(parseInt(avain));                     // vuosi -muuttujalle annetaan vvlaskenta -funktiossa määritetty numero
      if(!vuosiLuettelo.includes(vuosi)) {
        vuosiLuettelo.push(vuosi);                             // lisätään vuosi luetteloon jos sitä ei vielä ole
      }
      laskuri++;                                               // kasvatetaan laskuria yhdellä
      nimet_a.push(avain + "," + aika + "," + nimi);           // lisätään taulukkoon tallenne
    }
    else tot = false;
  }
  while (tot);
  // lajitellaan taulukot
  vuosiLuettelo.sort();
  vuosiLuettelo.reverse();
  nimet_a.sort();
  nimet_a.reverse();
  // Luodaan HTML -koodit, joilla luettelot näytetään
  // Ensin vuodet
  for(i = 0; i < vuosiLuettelo.length; i++) {
    ruudulle += "<tr><td width='220px'>" + vuosiLuettelo[i] + "</td></tr>";  // lisätään tulostettavaan luetteloon vuosiluku
  }
  // sitten kirjautuneet
  for(i = 0; i < nimet_a.length; i++) {
    vr = nimet_a[i].split(",");
    nimi = vr[2];
    aika = vr[1];
    avain = document.getElementById("ruska").value.toLowerCase();           // muutetaan kaikki kirjaimet pieniksi
    const IsotSivulta = avain.split(' ').map(capitalize).join(' ');       // muutetaan ekat sanat alkamaan isolla kirjaimella
    if(IsotSivulta == nimi || !avain) {
      tulosta += "<tr><td width='220px'>\"" + nimi + "\"</td><td width='73px'>" + aika + "</td></tr>";
    }
  }
  // viimeistellään tulostettavat koodit
  tulosta += '</table></div>';
  ruudulle += '</table></div>';
  // tulostetaan taulukot näyttöön niille HTML -koodissa p- ja id -koodeilla varattuihin tiloihin
  document.getElementById("ruudulle").innerHTML=tulosta;
  document.getElementById("ruudulle2").innerHTML = ruudulle;
  // "nollataan" sivujen syöttöruudut
  document.getElementById("ruska").innerHTML="";
  document.getElementById("inputti").focus;
}
