document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("navigacijaZaMobilni");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
});

let tamnimod = localStorage.getItem("tamni-mod");
const temaSwitch = document.querySelector(".tamnimod-svetlimod");

const enableTamnimod = () => {
  document.body.classList.add("tamni-mod");
  localStorage.setItem("tamni-mod", "active");
};

const disableTamnimod = () => {
  document.body.classList.remove("tamni-mod");
  localStorage.setItem("tamni-mod", null);
};

if (tamnimod === "active") enableTamnimod();

temaSwitch.addEventListener("click", () => {
  tamnimod = localStorage.getItem("tamni-mod");
  tamnimod !== "active" ? enableTamnimod() : disableTamnimod();
});

// ================= COOKIE =============================================================
function acceptKolacic() {
  // Postavi cookie koji traje 7 dana
  document.cookie = "kolacicAccepted=true; max-age=" + 7 * 24 * 60 * 60;
  document.getElementById("kolacic-kutija").style.display = "none";
}

// Ako je cookie već postavljen, sakrij poruku
if (document.cookie.includes("kolacicAccepted=true")) {
  document.getElementById("kolacic-kutija").style.display = "none";
}

const temaToggledugme = document.querySelector(".tamnimod-svetlimod");

// Funkcija za čitanje cookie-ja
function getKolacic(name) {
  const kolacici = document.cookie.split("; ");
  for (let kolacic of kolacici) {
    if (kolacic.startsWith(name + "=")) {
      return kolacic.split("=")[1];
    }
  }
  return null;
}

// Funkcija za postavljanje cookie-ja
function setKolacic(name, value, days) {
  const maxGodina = days * 24 * 60 * 60;
  document.cookie = `${name}=${value}; max-age=${maxGodina}; path=/`;
}

// Funkcija za toggle dark mode
function toggleTamniMod() {
  const isTamno = document.body.classList.toggle("tamni-mod"); // Dodaje ili uklanja klasu
  setKolacic("tamnimod", isTamno ? "true" : "false", 30); // Pamti stanje
}

// Dodaj klik event
temaToggledugme.addEventListener("click", toggleTamniMod);

// Kada se stranica učita, proveri cookie i primeni dark-mode ako treba
window.onload = function () {
  const tamnimodEnabled = getKolacic("tamnimod") === "true";
  if (tamnimodEnabled) {
    document.body.classList.add("tamni-mod");
  } else {
    document.body.classList.remove("tamni-mod"); // Obavezno ukloni ako nije aktivan
  }
};
// =======================================================================================
