document.addEventListener("DOMContentLoaded", function () {
  console.log("main.js loaded");
  randomColorBox();
  customizerBox();
  customizerFunctions();
  mobileMenu();
  staticTextAnimation();
  loadMorePosts();
  loadMoreTags();
  teamHoverActive();
  darkLiteMode()
  headerType();
  initialiseAosAndTocbot();
  if (window.AOS) {
    AOS.refreshHard(); // or AOS.refresh()
  }
});

// Mobile Menu Toggle
const mobileMenu = () => {
  const burger = document.querySelector(".header-utils-burger");
  const menu = document.querySelector(".mobile-header-menu");
  const menuClose = document.querySelector(".header-nav-close");

  if (!burger || !menu) return;

  burger.addEventListener("click", function () {
    const isOpen = menu.classList.contains("is-open");

    if (!isOpen) {
      // OPEN
      menu.classList.add("is-open");
      menu.classList.add("is-open-animation");
    } else {
      // CLOSE
      menu.classList.remove("is-open");

      setTimeout(() => {
        menu.classList.remove("is-open-animation");
      }, 1000); // slow close
    }
  });
};

const staticTextAnimation = () => {
  const container = document.querySelector(".trust-icons-cards");
  if (!container) return;

  const cards = container.querySelectorAll(".kg-product-card");

  cards.forEach((card, index) => {
    card.setAttribute("data-aos", "fade-up");
    card.setAttribute("data-aos-duration", 600);
    card.setAttribute("data-aos-delay", (index + 1) * 200);
  });
};

const loadMorePosts = () => {
  const posts = document.querySelectorAll(".post-item");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if(!loadMoreBtn) return;

  let visible = 0;
  const STEP = 4;

  function showNextPosts() {
    for (let i = visible; i < visible + STEP && i < posts.length; i++) {
      posts[i].classList.remove("hidden");
    }

    visible += STEP;

    if (visible >= posts.length) {
      loadMoreBtn.style.display = "none";
    }
  }

  // Initial load
  showNextPosts();

  loadMoreBtn.addEventListener("click", showNextPosts);
};
const loadMoreTags = () => {
  const tags = document.querySelectorAll(".tag-item");
  const loadMoreBtn = document.getElementById("loadMoreTagsBtn");
  if (!loadMoreBtn) return;

  let visible = 0;
  const STEP = 4;

  function showNextTags() {
    for (let i = visible; i < visible + STEP && i < tags.length; i++) {
      tags[i].classList.remove("hidden");
    }

    visible += STEP;

    if (visible >= tags.length) {
      loadMoreBtn.style.display = "none";
    }
  }

  // Initial load
  showNextTags();

  loadMoreBtn.addEventListener("click", showNextTags);
};
const customizerBox = () => {
  const toggle = document.getElementById("customizerToggle");
  const closeBtn = document.getElementById("customizerClose");
  const panel = document.getElementById("customizer");
  // if (!toggle || !panel ||!closeBtn) return;
  const openPanel = () => {
    panel.classList.remove("translate-x-0");
    panel.classList.add("translate-x-[-100%]");
    toggle.setAttribute("aria-expanded", "true");
  };

  const closePanel = () => {
    panel.classList.add("translate-x-0");
    panel.classList.remove("translate-x-[-100%]");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? closePanel() : openPanel();
  });

  closeBtn?.addEventListener("click", closePanel);

  // Optional: close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePanel();
  });
};

const customizerFunctions = () => {
  if (location.pathname.startsWith("/ghost/")) return;

 const select = document.getElementById("colorSchemeSelect");
if (!select) return;

const STORAGE_KEY = "theme-color";

const schemes = [
  "default",
  "dark-trail",
  "natural-escape",
  "urban-mist",
  "aqua-marine",
  "desert-bloom",
  "mocha-dark",
  "dark-amethyst",
];

function applyScheme(value) {
  document.body.classList.remove(...schemes);
  document.body.classList.add(value);
}

/* -----------------------------
   ON LOAD
----------------------------- */
const savedColor = localStorage.getItem(STORAGE_KEY);

if (savedColor && schemes.includes(savedColor)) {
  applyScheme(savedColor);
  select.value = savedColor; // ✅ sync dropdown
} else {
  // fallback: detect current body class
  const activeScheme = schemes.find(s => document.body.classList.contains(s));
  if (activeScheme) {
    select.value = activeScheme;
  } else {
    select.value = "default";
  }
}

/* -----------------------------
   ON CHANGE
----------------------------- */
select.addEventListener("change", (e) => {
  const value = e.target.value;
  applyScheme(value);
  localStorage.setItem(STORAGE_KEY, value);
      const darkSpan = document.getElementById("dark-span");
  const lightSpan = document.getElementById("light-span");
  if (value === "default") {
    darkSpan.classList.add("opacity-0");
    lightSpan.classList.remove("opacity-0");
  } else {
    darkSpan.classList.remove("opacity-0");
    lightSpan.classList.add("opacity-0");
  }
});


  ////////////////////////////////////////////////////////////////////////////////////

  const input = document.getElementById("brandColorInput");
const resetBtn = document.getElementById("customizerReset");

if (!input) return;

const ACCENT_KEY = "theme_accent_color";

function applyAccent(color) {
  document.documentElement.style.setProperty("--theme-accent-color", color);
}


function getGhostAccent() {
  return getComputedStyle(document.documentElement)
    .getPropertyValue("--ghost-accent-color")
    .trim();
}

/* -----------------------------
   ON LOAD
----------------------------- */
const saved = localStorage.getItem(ACCENT_KEY);

if (saved) {
  applyAccent(saved);
  input.value = saved; // ✅ sync picker
} else {
  const ghostAccent = getGhostAccent();
  if (ghostAccent) {
    input.value = ghostAccent; // ✅ show real accent
  }
}

/* -----------------------------
   ON CHANGE
----------------------------- */
input.addEventListener("input", (e) => {
  const color = e.target.value;
  applyAccent(color);
  localStorage.setItem(ACCENT_KEY, color);
});



const headingSelect = document.getElementById("headingFontSelect");
const bodySelect = document.getElementById("bodyFontSelect");
// const resetBtn = document.getElementById("customizerReset");

if (!headingSelect || !bodySelect) return;

/* ---------------------------------
   STORAGE KEYS
--------------------------------- */
const HEADING_KEY = "theme-heading-font";
const BODY_KEY = "theme-body-font";

/* ---------------------------------
   FONT STACKS
--------------------------------- */
const SYSTEM_STACK =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
const SERIF_STACK =
  'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif';
const MONO_STACK =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

const FONT_STACKS = {
  Default: null,

  "Fira Mono": `"Fira Mono", ${MONO_STACK}`,
  "Fira Sans": `"Fira Sans", ${SYSTEM_STACK}`,
  "IBM Plex Serif": `"IBM Plex Serif", ${SERIF_STACK}`,
  Inter: `"Inter", ${SYSTEM_STACK}`,
  "JetBrains Mono": `"JetBrains Mono", ${MONO_STACK}`,
  Lora: `"Lora", ${SERIF_STACK}`,
  Manrope: `"Manrope", ${SYSTEM_STACK}`,
  Merriweather: `"Merriweather", ${SERIF_STACK}`,
  "Noto Sans": `"Noto Sans", ${SYSTEM_STACK}`,
  "Noto Serif": `"Noto Serif", ${SERIF_STACK}`,
  Nunito: `"Nunito", ${SYSTEM_STACK}`,
  Poppins: `"Poppins", ${SYSTEM_STACK}`,
  Roboto: `"Roboto", ${SYSTEM_STACK}`,
  "Space Mono": `"Space Mono", ${MONO_STACK}`,

  Cardo: `"Cardo", ${SERIF_STACK}`,
  "Chakra Petch": `"Chakra Petch", ${SYSTEM_STACK}`,
  "Libre Baskerville": `"Libre Baskerville", ${SERIF_STACK}`,
  "Old Standard TT": `"Old Standard TT", ${SERIF_STACK}`,
  Rufina: `"Rufina", ${SERIF_STACK}`,
  "Space Grotesk": `"Space Grotesk", ${SYSTEM_STACK}`,
  "Tenor Sans": `"Tenor Sans", ${SYSTEM_STACK}`,
};

/* ---------------------------------
   GOOGLE FONTS MAP
--------------------------------- */
const GF = {
  Cardo: "https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&display=swap",
  "Chakra Petch":
    "https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&display=swap",
  "Fira Mono":
    "https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&display=swap",
  "Fira Sans":
    "https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700&display=swap",
  "IBM Plex Serif":
    "https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;500;600;700&display=swap",
  Inter:
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  "JetBrains Mono":
    "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap",
  Lora:
    "https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap",
  Manrope:
    "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap",
  Merriweather:
    "https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&display=swap",
  "Noto Sans":
    "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap",
  "Noto Serif":
    "https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;500;600;700&display=swap",
  Nunito:
    "https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap",
  Poppins:
    "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
  Roboto:
    "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
  Rufina:
    "https://fonts.googleapis.com/css2?family=Rufina:wght@400;700&display=swap",
  "Space Grotesk":
    "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
  "Space Mono":
    "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap",
  "Tenor Sans":
    "https://fonts.googleapis.com/css2?family=Tenor+Sans&display=swap",
};

/* ---------------------------------
   HELPERS
--------------------------------- */
function ensurePreconnect() {
  if (document.getElementById("gf-preconnect-1")) return;

  const p1 = document.createElement("link");
  p1.id = "gf-preconnect-1";
  p1.rel = "preconnect";
  p1.href = "https://fonts.googleapis.com";
  document.head.appendChild(p1);

  const p2 = document.createElement("link");
  p2.id = "gf-preconnect-2";
  p2.rel = "preconnect";
  p2.href = "https://fonts.gstatic.com";
  p2.crossOrigin = "anonymous";
  document.head.appendChild(p2);
}

function ensureFontLoaded(name) {
  const href = GF[name];
  if (!href) return;

  const id = "gf-" + name.toLowerCase().replace(/\s+/g, "-");
  if (document.getElementById(id)) return;

  ensurePreconnect();

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function applyHeading(name) {
  if (name === "Default") {
    document.documentElement.style.setProperty(
      "--preview-font-heading",
      "var(--gh-font-heading, var(--gh-font-body))"
    );
    return;
  }
  ensureFontLoaded(name);
  document.documentElement.style.setProperty(
    "--preview-font-heading",
    FONT_STACKS[name] || SYSTEM_STACK
  );
}

function applyBody(name) {
  if (name === "Default") {
    document.documentElement.style.setProperty(
      "--preview-font-body",
      "var(--gh-font-body)"
    );
    return;
  }
  ensureFontLoaded(name);
  document.documentElement.style.setProperty(
    "--preview-font-body",
    FONT_STACKS[name] || SYSTEM_STACK
  );
}

/* ---------------------------------
   LOAD FROM STORAGE
--------------------------------- */
const savedHeading = localStorage.getItem(HEADING_KEY) || "Default";
const savedBody = localStorage.getItem(BODY_KEY) || "Default";

headingSelect.value = savedHeading;
bodySelect.value = savedBody;

applyHeading(savedHeading);
applyBody(savedBody);

/* ---------------------------------
   EVENTS
--------------------------------- */
headingSelect.addEventListener("change", () => {
  localStorage.setItem(HEADING_KEY, headingSelect.value);
  applyHeading(headingSelect.value);
});

bodySelect.addEventListener("change", () => {
  localStorage.setItem(BODY_KEY, bodySelect.value);
  applyBody(bodySelect.value);
});

/* ---------------------------------
   RESET
--------------------------------- */
resetBtn?.addEventListener("click", (e) => {
  e.preventDefault();

  /* reset accent color */
  localStorage.removeItem("theme_accent_color");
  document.documentElement.style.removeProperty("--theme-accent-color");
   const ghostAccent = getComputedStyle(document.documentElement)
    .getPropertyValue("--ghost-accent-color")
    .trim();

  if (ghostAccent) {
    input.value = ghostAccent;
  }

  /* reset theme scheme */
  localStorage.removeItem("theme-color");
  const ghostTheme = document.body.dataset.ghostThemeColor;
  select.value = ghostTheme;
  applyScheme(ghostTheme);

  /* reset fonts */
  localStorage.removeItem("theme-heading-font");
  localStorage.removeItem("theme-body-font");

  // remove preview overrides
  document.documentElement.style.removeProperty("--preview-font-heading");
  document.documentElement.style.removeProperty("--preview-font-body");

  // restore Ghost defaults explicitly
  document.documentElement.style.setProperty(
    "--preview-font-heading",
    "var(--gh-font-heading, var(--gh-font-body))"
  );
  document.documentElement.style.setProperty(
    "--preview-font-body",
    "var(--gh-font-body)"
  );

  headingSelect.value = "Default";
  bodySelect.value = "Default";
});

};

const randomColorBox = () => { 
  
  const box = document.querySelectorAll(".randomColorBox");

  console.log("randommmmmmmmmmmmmmmmmmmmmmmm",box)

            // Predefined combinations
            const themes = [
                "color-theme-1",
                "color-theme-2",
                "color-theme-3",
                "color-theme-4",
                "color-theme-5",
                "color-theme-6"
            ];

            // Pick a random one
            box.forEach((b) => {
    const randomClass = themes[Math.floor(Math.random() * themes.length)];
    b.classList.add(randomClass);
  }
  );
}

const teamHoverActive = () => {
  const wrapper = document.querySelector('.team-member-wrapper');
  if (!wrapper) return;

  const cards = wrapper.children;

  Array.from(cards).forEach(card => {
    card.addEventListener('mouseenter', () => {
      Array.from(cards).forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
};
const darkLiteMode = () => {
  const toggle = document.getElementById("dark-lite-mode");
  toggle.classList.add("dark-trail");
  if (!toggle) return;
const schemes = [
  "default",
  "dark-trail",
  "natural-escape",
  "urban-mist",
  "aqua-marine",
  "desert-bloom",
  "mocha-dark",
  "dark-amethyst",
];
  toggle.addEventListener("click", () => {
 const select = document.getElementById("colorSchemeSelect");
    const darkSpan = document.getElementById("dark-span");
    const lightSpan = document.getElementById("light-span");
    if (!document.body.classList.contains("dark-trail")) {
    darkSpan.classList.remove("opacity-0");
    lightSpan.classList.add("opacity-0");
    document.body.classList.remove(...schemes);
    document.body.classList.add("dark-trail");
    select.value = "dark-trail";
    localStorage.setItem("theme-color", "dark-trail");
    } else {
    darkSpan.classList.add("opacity-0");
    lightSpan.classList.remove("opacity-0");
      document.body.classList.remove(...schemes);
    document.body.classList.add("default");
    select.value = "default";

    localStorage.setItem("theme-color", "default");
  }})
  

  

}
const initialiseAosAndTocbot = () => {

    if (typeof tocbot !== "undefined" && document.querySelector('.toc')) {
        tocbot.init({
            tocSelector: '.toc',
            contentSelector: '.page-content',  // 🔥 FIX IS HERE
            headingSelector: 'h1, h2, h3',
            collapseDepth: 0
        });
    }
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1200
    });
  }

}

const headerType = () => {
        document.addEventListener("DOMContentLoaded", () => {
            const header = document.getElementById("siteHeader");
            if (!header) return;

            const style = header.dataset.headerStyle; // always | animated | none

            const STICKY_CLASS = "header-sticky";
            const HIDDEN_CLASS = "is-hidden";

            let lastScrollY = window.scrollY;

            /* --------------------------------
               Apply base behavior
            ---------------------------------*/
            if (style === "always" || style === "animated") {
                header.classList.add(STICKY_CLASS);
            } else {
                header.classList.remove(STICKY_CLASS, HIDDEN_CLASS);
            }

            /* --------------------------------
               Animated scroll behavior
            ---------------------------------*/
            if (style === "animated") {
                window.addEventListener("scroll", () => {
                    const currentScrollY = window.scrollY;

                    if (currentScrollY > lastScrollY && currentScrollY > 120) {
                        // scrolling down → hide
                        header.classList.add(HIDDEN_CLASS);
                    } else {
                        // scrolling up → show
                        header.classList.remove(HIDDEN_CLASS);
                    }

                    lastScrollY = currentScrollY;
                });
            }
        });
}