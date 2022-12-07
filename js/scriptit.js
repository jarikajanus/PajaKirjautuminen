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
  document.getElementById('inputti').value = "";
  sleep(3);
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
  let kklaskuri = [];                                          // kuukausien kirjauslaskuri
  let laskuri = 0;                                             // laskuri localStorage käyttöön
  let tot = true;                                              // silmukan minimiarvo
  let vr = [];                                                 // nimestä ja ajasta saatu taulukko
  let nimi = "";                                               // alustetaan muuttuja nimitiedolle
  let aika = "";                                               // alustetaan muuttuja käynnin aikatiedolle
  let vuosi = "";                                              // esitellään vuosi -muuttuja
  let kuukausi = "";                                           // esitellään kuukausi -muuttuja
  let kk_nimet = ["","Tammi","Helmi","Maalis","Huhti","Touko","Kesä","Heinä","Elo","Syys","Loka","Marras","Joulu"];
  let k1=0;let k2=0;let k3=0;let k4=0;let k5=0;let k6=0;let k7=0;let k8=0;let k9=0;let k10=0;let k11=0;let k12=0;
  let tulosta = "</div><div class='tulostus'>";                // esitellään kirjautuneiden luettelo
  tulosta += "<table><tr><th style='width:400px'>Nimi</th><th style='width:100px'>Aika</th></tr>";
  let ruudulle = "<div class='tulostus'>";                     // esitellään vuosien luettelo
  const vuosiLuettelo = [];                                    // esitellään vuosilukujen taulukko
  const nimet_a = [];                                          // Luodaan taulukko a (lajiteltu nimen nukaan)
  let avain = "";
  // perustetaan silmukka; käytetään minimi ja maksimiarvoina aiemmin haettua ja laskettua arvoa
  // haetaan arvot ja tallennetaan ne taulukoihin
  do {
    if(avain = localStorage.key(laskuri)) {                    // Haetaan localStoragesta seuraava avain
      // console.log(avain);
      nimi = localStorage.getItem(avain);                      // nimi -muuttuja saa arvoksi taulukon arvon
      aika = pvmlaskenta(parseInt(avain));                     // aika -muuttujalle annetaan pvmlaskenta -funktiossa määritetty numero
      vuosi = vvlaskenta(parseInt(avain));                     // vuosi -muuttujalle annetaan vvlaskenta -funktiossa määritetty numero
      kuukausi = kklaskenta(parseInt(avain));                  // kuukausi -muuttujalle annetaan kklaskenta -funktiossa määritetty numero
      muistista = localStorage.getItem(avain);   // nimi -muuttuja saa muistista luetun arvon
      if(muistista != "yks" && muistista !="tulosta") {
        nimet_a.push(avain + "," + aika + "," + nimi + "," + vuosi + "," + kuukausi);           // lisätään taulukkoon tallenne
        if(!vuosiLuettelo.includes(vuosi)) {
          vuosiLuettelo.push(vuosi);                             // lisätään vuosi luetteloon jos sitä ei vielä ole
        }
      }
      laskuri++;
    }
    else tot = false;
  }
  while (tot);
  vuosiLuettelo.sort();
  vuosiLuettelo.reverse();
  nimet_a.sort();
  nimet_a.reverse();
  // Luodaan HTML -koodit, joilla luettelot näytetään

  // Tulostetaan ruudulle kokonaiskirjautumismöäärä
  ruudulle += "<p class='w3-large w3-text-black' style='text-align:center;'>Kokonaiskävijämäärä: " + nimet_a.length + "</p>";
  for(var k = 0; k < vuosiLuettelo.length; k++) {
    // Nollataan kuukausien laskentamuuttujat
    k1=0;k2=0;k3=0;k4=0;k5=0;k6=0;k7=0;k8=0;k9=0;k10=0;k11=0;k12=0;
    // Aloitetaan vuosien käsittely
    ruudulle += "<p class='w3-small w3-text-blue' style='text-align:center;'>" + vuosiLuettelo[k] + " </p>";                              // lisätään tulostettavaan luetteloon vuosiluku
    for(var o = 0; o < nimet_a.length; o++) {
      vr = nimet_a[o].split(",");
      vuosi = parseInt(vr[3]);
      kuukausi = parseInt(vr[4]);
      if(vuosi == parseInt(vuosiLuettelo[k])) {
        switch(kuukausi) {
          case 1: k1++;break;
          case 2: k2++;break;
          case 3: k3++;break;
          case 4: k4++;break;
          case 5: k5++;break;
          case 6: k6++;break;
          case 7: k7++;break;
          case 8: k8++;break;
          case 9: k9++;break;
          case 10: k10++;break;
          case 11: k11++;break;
          case 12: k12++;break;
        }
      }
    }
    ruudulle += "<p class='w3-small w3-text-blue'>";
    for(var z = 1; z <= 12; z++) {
      switch(z) {
        case 1: ruudulle += kk_nimet[z] + " => " + k1 + "<br>";break;
        case 2: ruudulle += kk_nimet[z] + " => " + k2 + "<br>";break;
        case 3: ruudulle += kk_nimet[z] + " => " + k3 + "<br>";break;
        case 4: ruudulle += kk_nimet[z] + " => " + k4 + "<br>";break;
        case 5: ruudulle += kk_nimet[z] + " => " + k5 + "<br>";break;
        case 6: ruudulle += kk_nimet[z] + " => " + k6 + "<br>";break;
        case 7: ruudulle += kk_nimet[z] + " => " + k7 + "<br>";break;
        case 8: ruudulle += kk_nimet[z] + " => " + k8 + "<br>";break;
        case 9: ruudulle += kk_nimet[z] + " => " + k9 + "<br>";break;
        case 10: ruudulle += kk_nimet[z] + " => " + k10 + "<br>";break;
        case 11: ruudulle += kk_nimet[z] + " => " + k11 + "<br>";break;
        case 12: ruudulle += kk_nimet[z] + " => " + k12 + "<br>";break;
      }
    }
    ruudulle += "</p>";
  }
  // sitten kirjautuneet
  for(i = 0; i < nimet_a.length; i++) {
    vr = nimet_a[i].split(",");
    nimi = vr[2];
    aika = vr[1];
    avain = document.getElementById("ruska").value.toLowerCase();           // muutetaan kaikki kirjaimet pieniksi
    const IsotSivulta = avain.split(' ').map(capitalize).join(' ');         // muutetaan ekat sanat alkamaan isolla kirjaimella
    /*console.log("Avain = " + avain + ", pituus = " + avain.length + ",nimi = " + nimi + ", pituus = " + nimi.length);
    console.log("nimi.substring = " + nimi.substring(0, avain.length).toLowerCase());*/
    if(IsotSivulta == nimi || avain == nimi.substring(0, avain.length).toLowerCase()) {
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
