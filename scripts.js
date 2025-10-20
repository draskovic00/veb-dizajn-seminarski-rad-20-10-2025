// STICKY NAVGACIJA

const sekcijaHeroEl = document.querySelector(".hero-sekcija");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-96px",
  }
);
obs.observe(sekcijaHeroEl);

//BACKGROUND slajdR

document.addEventListener("DOMContentLoaded", () => {
  const recepti = document.querySelector(".recepti");
  const slajds = document.querySelectorAll(".slajd");
  const levodugme = document.querySelector(".levo-strelica");
  const desnodugme = document.querySelector(".desno-strelica");

  let activeslajd = 0;

  function updateslajd() {
    console.log("Active slajd Index:", activeslajd);

    slajds.forEach((slajd, index) => {
      slajd.classList.remove("aktivan");
      if (index === activeslajd) {
        ("");
        slajd.classList.add("aktivan");
      }
    });

    setBgToRecepti();

    const recipenaslov = document.querySelector("#recipenaslov");
    const recipeDescription = document.querySelector("#recipeDescription");

    const activeslajdElement = slajds[activeslajd];

    // Log the attributes for debugging
    console.log("Data naslov:", activeslajdElement.getAttribute("data-naslov"));
    console.log(
      "Data Description:",
      activeslajdElement.getAttribute("data-description")
    );

    recipenaslov.innerText =
      activeslajdElement.getAttribute("data-naslov") || "No naslov";
    recipeDescription.innerHTML =
      activeslajdElement.getAttribute("data-description") ||
      "<p>No description available.</p>";

    console.log("Updated naslov:", recipenaslov.innerText);
    console.log("Updated Description:", recipeDescription.innerHTML);
  }

  function setBgToRecepti() {
    const activeslajdElement = slajds[activeslajd];
    recepti.style.backgroundImage = activeslajdElement.style.backgroundImage;
    console.log("Background Image:", activeslajdElement.style.backgroundImage);
  }

  desnodugme.addEventListener("click", () => {
    activeslajd = (activeslajd + 1) % slajds.length;
    updateslajd();
  });

  levodugme.addEventListener("click", () => {
    activeslajd = (activeslajd - 1 + slajds.length) % slajds.length;
    updateslajd();
  });

  updateslajd();
});

//******************************* CHECK BOX ************************************

document.addEventListener("DOMContentLoaded", () => {
  const checkboxForm = document.getElementById("checkboxForm");
  const checkboxPoruka = document.getElementById("checkboxPoruka");
  const checkboxdugme = document.getElementById("checkboxdugme");

  checkboxdugme.addEventListener("click", () => {
    const selectedCheckboxes = Array.from(
      checkboxForm.querySelectorAll('input[name="blogTopics"]:checked')
    ).map((cb) => cb.nextSibling.textContent.trim());
    if (selectedCheckboxes.length > 0) {
      checkboxPoruka.textContent = `Izabrali ste sledeće teme: ${selectedCheckboxes.join(
        ", "
      )}.`;
    } else {
      checkboxPoruka.textContent = "Niste izabrali nijednu temu.";
    }
  });
});
// HAMBURGER NAVIGACIJA
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("navigacijaZaMobilni");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
});

// ================= DARK MODE ================

let tamniMod = localStorage.getItem("tamni-mod");
const themeSwitch = document.querySelector(".tamnimod-svetlimod");

const dozvoliTamnimod = () => {
  document.body.classList.add("tamni-mod");
  localStorage.setItem("tamni-mod", "active");
};

const iskljuciTamnimod = () => {
  document.body.classList.remove("tamni-mod");
  localStorage.setItem("tamni-mod", null);
};

if (tamniMod === "active") dozvoliTamnimod();

themeSwitch.addEventListener("click", () => {
  tamniMod = localStorage.getItem("tamni-mod");
  tamniMod !== "active" ? dozvoliTamnimod() : iskljuciTamnimod();
});
// ================= COOKIE =============================================================
function prihvatiKolacic() {
  // Postavi cookie koji traje 7 dana
  document.cookie = "cookieAccepted=true; max-age=" + 7 * 24 * 60 * 60;
  document.getElementById("kolacic-kutija").style.display = "none";
}

// Ako je cookie već postavljen, sakrij poruku
if (document.cookie.includes("cookieAccepted=true")) {
  document.getElementById("kolacic-kutija").style.display = "none";
}

const temaPromenadugme = document.querySelector(".tamnimod-svetlimod");

// Funkcija za čitanje cookie-ja
function getKolacic(name) {
  const kolacici = document.cookie.split("; ");
  for (let kolacic of kolacici) {
    if (cookie.startsWith(name + "=")) {
      return cookie.split("=")[1];
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
function promenaTamniMod() {
  const isTamno = document.body.classList.toggle("tamni-mod"); // Dodaje ili uklanja klasu
  setCookie("tamniMod", isTamno ? "true" : "false", 30); // Pamti stanje

  console.log("Tema je sada:", isTamno ? "tamno" : "svetlo");
  console.log("Cookie poslat:", document.cookie);
}

// Dodaj klik event
themeToggledugme.addEventListener("click", promenaTamniMod);

// Kada se stranica učita, proveri cookie i primeni dark-mode ako treba
window.onload = function () {
  const tamniModDozvoljen = getKolacic("tamniMod") === "true";
  if (tamniModDozvoljen) {
    document.body.classList.add("tamni-mod");
  } else {
    document.body.classList.remove("tamni-mod"); // Obavezno ukloni ako nije aktivan
  }
};

// =======================================================================================
