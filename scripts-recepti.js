// STICKY NAVIGATION

const sectionHeroEl = document.querySelector(".hero-section");

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
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

//Search BOX
// search-script.js
document.addEventListener("DOMContentLoaded", () => {
  const recipes = [
    { name: "Sarma", id: "lazanja" },
    { name: "Ćevapi", id: "pizza" },
    { name: "Punjene paprike", id: "jastog" },
    { name: "Gibanica", id: "losos" },
  ];

  const searchBox = document.getElementById("searchBox");
  const searchdugme = document.getElementById("searchdugme");
  const resultsDropdown = document.getElementById("results");

  function updateResults(query) {
    resultsDropdown.innerHTML = "";
    if (query) {
      const filteredRecipes = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(query.toLowerCase())
      );

      if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
          const div = document.createElement("div");
          div.textContent = recipe.name;
          div.addEventListener("click", () => {
            document
              .getElementById(recipe.id)
              .scrollIntoView({ behavior: "smooth" });
            resultsDropdown.innerHTML = "";
            resultsDropdown.style.display = "none";
          });
          resultsDropdown.appendChild(div);
        });
        resultsDropdown.style.display = "block";
      } else {
        resultsDropdown.innerHTML = "<div>Nema rezultata</div>";
        resultsDropdown.style.display = "block";
      }
    } else {
      resultsDropdown.style.display = "none";
    }
  }

  searchBox.addEventListener("input", () => {
    updateResults(searchBox.value);
  });

  searchdugme.addEventListener("click", () => {
    updateResults(searchBox.value);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburgerdugme");
  const nav = document.getElementById("navigacija");

  hamburger.addEventListener("click", function () {
    nav.classList.toggle("active");
  });
});

// ================ DARK MODE ===========================================

let tamnimod = localStorage.getItem("tamni-mod");
const themeSwitch = document.querySelector(".tamnimod-svetlimod");

const enableTammimod = () => {
  document.body.classList.add("tamni-mod");
  localStorage.setItem("tamni-mod", "active");
};

const disableTamnimod = () => {
  document.body.classList.remove("tamni-mod");
  localStorage.setItem("tamni-mod", null);
};

if (tamnimod === "active") enableTammimod();

themeSwitch.addEventListener("click", () => {
  tamnimod = localStorage.getItem("tamni-mod");
  tamnimod !== "active" ? enableTammimod() : disableTamnimod();
});

// =====================================================================

// ================= COOKIE =============================================================
function prihvatiKolacic() {
  // Postavi cookie koji traje 7 dana
  document.cookie = "kolacicAccepted=true; max-age=" + 7 * 24 * 60 * 60;
  document.getElementById("kolacic-kutija").style.display = "none";
}

// Ako je cookie već postavljen, sakrij poruku
if (document.cookie.includes("kolacicAccepted=true")) {
  document.getElementById("kolacic-kutija").style.display = "none";
}

const themeToggledugme = document.querySelector(".tamnimod-svetlimod");

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
function toggleTamnimod() {
  const isTamno = document.body.classList.toggle("tamni-mod"); // Dodaje ili uklanja klasu
  setKolacic("tamniMod", isTamno ? "true" : "false", 30); // Pamti stanje
}

// Dodaj klik event
themeToggledugme.addEventListener("click", toggleTamnimod);

// Kada se stranica učita, proveri cookie i primeni dark-mode ako treba
window.onload = function () {
  const tamnimodEnabled = getKolacic("tamniMod") === "true";
  if (tamnimodEnabled) {
    document.body.classList.add("tamni-mod");
  } else {
    document.body.classList.remove("tamni-mod"); // Obavezno ukloni ako nije aktivan
  }
};

// =======================================================================================
