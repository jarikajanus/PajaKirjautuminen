function muuta() {
  const x = document.getElementById("yks");
  const y = document.getElementById("tulosta");
  if (window.getComputedStyle(x).display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  }
  else {
    x.style.display = "none";
    y.style.display = "block";
  }
}
