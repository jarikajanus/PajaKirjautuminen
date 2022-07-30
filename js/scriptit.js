function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 1.
// tiedostoon kirjoitus
function Kirjoita(nimet) {
  // Esitellään muuttujat
  name = nimet.toLowerCase();
  const IsotName = name.split(' ').map(capitalize).join(' '); // muutetaan ekat sanat alkamaan isolla kirjaimella
  const d = new Date();                                // esitellään d -muuttuja, jonka alkuarvona päivämäärä
  let time  = d.getTime();                             // annetaan Time -muuttujalle arvoksi pitkä aika-arvo (millisekuntien määrä 1.1.1970 alkaen)
  localStorage.setItem(time, IsotName);                // Kirjotetaan tallennustilaan nimi- ja aikatiedot
  //sisus.unshift(time + "," + IsotName);                // lisätään taulukon alkuun uusi arvo
  location.reload();                                   // Uudistetaan selainikkuna => tyhjennetään syöttöikkuna
  document.getElementById('inputti').focus();          // asetetaan kohdistin syöttöikkunaan
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
      // VIRHE, jos käyttäjä yrittää täyttää rekisterin ja lisää tekstiin välilyönnin
      virheteksti += "'täytä' ja välilyönti samaan aikaan ei ole sallittua";
    }
    else if(!tat && !kaksi && !sukunimi) {                    // Jos tekstissä ei ole sanaa 'täyttö' eikä välilyöntiä eikä sukunimeä
      // VIRHE, jos käyttäjä ei yrittä täyttää rekisteriä eikä lisää välilyöntiä ja sukunimeä
      virheteksti += "Sukunimi puuttuu";
    }
    else if(tat && !kaksi) {
      tayta();                                                // Ei virhettä, käynnistetään täyttöprosessi
      virheteksi += "Tervetuloa Pajaan!";                     // Tervetuloteksti onnistuttaessa
    }
    else if (!tat && kaksi && !sukunimi) {                    // Jos tekstissä ei ole sanaa 'täyttö' mutta välilyönti on ilman sukunimeä
      // VIRHE, jos käyttäjä yrittää täyttää rekisterin eikä lisää välilyöntiä ja sukunimeä
      virheteksti += "Sukunimi puuttuu";
    }
    else if(!tat && kaksi && sukunimi) Kirjoita(kirjoitettu);  // Ei virhettä, kirjoitetaan rekisteriin
  }
  else if(pit > 0 && pit <= 4) {
    // VIRHE, jos pituus on suurempi kuin 0 mutta jää silti neljään merkkiin
    virheteksti += "Really? Yritä uudelleen";
  }
  document.getElementById('virhetieto').innerHTML=virheteksti;
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
  let tulosta = "";   // alustetaan muuttuja tulostettavalle tiedolle
  const tulosta2 = [];// esitellään vuosille taulukko
  let vr = "";        // alustetaan muuttuja localStoragesta haettavalle tekstille
  let vl = [];        // alustetaan muuttuja hajotettavasta taulukon arvosta saataville kahdelle arvolle
  let nimi = "";      // alustetaan muuttuja nimitiedolle (taulukon 1. arvo)
  let aika = "";      // alustetaan muuttuja käynnin aikatiedolle (taulukon 2. arvo)
  let avain = "";     // alustetaan muuttuja localStoragesta haettavan avaimen koodille
  let totuus = true;  // alustetaan totuusarvomuuttuja ja annetaan sille alkuarvo "true"
  let laskuri = 0;    // alustetaan laskurimuuttuja ja annetaan sille alkuarvo 1
  let vuodet = "";    // esitellään vuodet -muuttuja ja annetaan alkuarvoksi tyhjä merkkijono
  let ruudulle = "<form id='lomake2'><div class='tulostus'>";  // esitellään tulostettava vuosien tekstimuuttuja ja annetaan sille id:ksi "lomake2"
  // luodaan tulostettaville kirjaustiedoille lomake ja annetaan sille id "lomake1"
  tulosta = "<form id='lomake1'>";
  // Luodaan tulostettaville vuosille taulukko
  ruudulle += "<table><tr><th style='width:220px'>Vuosi</th><th style='width:25px'>Poista?</th></tr>";
  // Luodaan tulostettava taulukko ja annetaan sille alkuarvoksi otsikkotiedot ja määritetään taulukon leveydet
  tulosta += "<div class='tulostus'><table>";
  tulosta += "<tr><th style='width:220px'>Nimi</th><th style='width:73px'>Aika</th></tr>";
  do {                                                    // Aloitetaan silmukka arvojen haulle localStoragesta
    if(avain = localStorage.key(laskuri)) {               // Haetaan localStoragesta seuraava avain
      vr = avain + "," + localStorage.getItem(avain);     // asetetaan taulukkoon arvoksi teksti, jossa on avain ja arvo pilkulla erotettuina
      vl = vr.split(",");                                 // hajotetaan arvo pilkulla erotettuihin ja tallennetaan ne vl -taulukkoon
      nimi = '"' + vl[1] + '"';                           // nimi -muuttuja saa arvoksi taulukon ensimmäisen arvon
      aika = pvmlaskenta(parseInt(vl[0]));                // aika -muuttujalle annetaan pvmlaskenta -funktiossa määritetty teksti
      // tulosta -muuttujaan lisätään taulukon rivi, jossa esitetään kirjautumisen yhteydessä tallennetut nimi- ja aikatiedot
      if(tarkastaNimi(vl[1])) tulosta += "<tr><td width='220px'>" + nimi + "</td><td width='73px'>" + aika
        + "</td></tr>";
      vuodet = vvlaskenta(parseInt(vl[0]));   // aika -muuttujalle annetaan pvmlaskenta -funktiossa määritetty teksti
      if(!tulosta2.includes(vuodet)) tulosta2.push(vuodet);  // lisätään vuosi luetteloon jos sitä ei vielä ole
      laskuri++;                                          // Lisätään laskurin arvoa yhdellä vseuraavaa kierrosta varten
    }
    else totuus = false;
  }
  while(totuus);
  if(laskuri > 0) tulosta += '</table></div></form>';
  else tulosta = "<div class='tulostus'>--- ei arvoja ---</div>";
  tulosta2.sort();
  tulosta2.reverse();
  for(let i=0; i<tulosta2.length; i++) {
    ruudulle += "<tr><td width='220px'>" + tulosta2[i].toString()
      + "</td><td onclick='poista(2," + tulosta2[i].toString() + ")'>Click</td></tr>";
       /*onclick='poista(2," + i + ")'*/
  }
  ruudulle += '</table></div></form>';
  document.getElementById("ruudulle2").innerHTML = ruudulle;
  // tulostetaan taulukko näyttöön sille HTML -koodissa p- ja id -koodeilla varattuun tilaan
  document.getElementById("ruudulle").innerHTML=tulosta;
  // "nollataan" sivujen syöttöruudut
  //document.getElementById("ruska").value="";
  document.getElementById("inputti").focus;
}
