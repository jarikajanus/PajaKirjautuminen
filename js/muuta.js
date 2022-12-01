function muuta() {
  const x = document.getElementById("yks");
  const y = document.getElementById("tulosta");
  let tsekkaa = "";
  if (window.getComputedStyle(x).display === "none") {
    x.style.display = "block";
    y.style.display = "none";
    localStorage.setItem("sivulla", "tulosta");
    tsekkaa = localStorage.getItem("sivulla");
    console.log("tsekkaa = " + tsekkaa);
  }
  else {
    x.style.display = "none";
    y.style.display = "block";
    localStorage.setItem("sivulla", "yks");
    tsekkaa = localStorage.getItem("sivulla");
    console.log("tsekkaa = " + tsekkaa);
  }
}

function tsekkaaSivu() {
  let tsekkaa = localStorage.getItem("sivulla");
  if(tsekkaa == "yks") muuta();
}
