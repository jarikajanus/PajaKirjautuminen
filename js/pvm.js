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
