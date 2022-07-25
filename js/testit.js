function pvmTesti() {
  let tulosta = "";
  const d = new Date();                                 // esitellään d -muuttuja, jonka alkuarvona päivämäärä
  let time  = d.getTime();                              // annetaan Time -muuttujalle arvoksi pitkä aika-arvo (millisekuntien määrä 1.1.1970 alkaen)
  //let time2 = d.getTime(100000);
  let time3 = Date.parse("March 21, 2012");
  let time4 = Date.parse("February 21, 2012");
  let time5 = Date.parse("March 21, 2011");
  let kkero = time3 - time4;
  let vvero = time3 - time5;


  /*
  let time3 = d.getTime("06.18.2022");
  let time4 = d.getTime(100000);
  let time5 = d.getTime(100000);
  let time6 = d.getTime(100000);*/




  tulosta = "<table><tr><th>Aika</th><th>millisekunnit</th></tr>";
  tulosta += "<tr><td>Nyt</td><td>" + time + "</td></tr>";
  //tulosta += "<tr><td>100000</td><td>" + time2 + "</td></tr>";
  tulosta += "<tr><td>February 21, 2012</td><td>" + time4 + "</td></tr>";
  tulosta += "<tr><td>March 21, 2012</td><td>" + time3 + "</td></tr>";
  tulosta += "<tr><td>Kuukausi Erotus = </td><td>" + kkero + "</td></tr>";
  tulosta += "<tr><td>Vuosi Erotus = </td><td>" + vvero + "</td></tr>";


  tulosta += "</table>";
  // alert(tulosta);
  document.getElementById("testi").innerHTML=tulosta;
}
