document.addEventListener("DOMContentLoaded", function () {
  console.log("main.js loaded");
  randomColorBox();
  mobileMenu();
  staticTextAnimation();
  loadMorePosts();
  customizerBox();
  customizerFunctions();
  teamHoverActive();
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
const customizerBox = () => {
  const toggle = document.getElementById("customizerToggle");
  const closeBtn = document.getElementById("customizerClose");
  const panel = document.getElementById("customizer");

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
  const select = document.getElementById("colorSchemeSelect");
  select.value = document.body.classList;
  if (!select) return;

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

  // Apply on change
  select.addEventListener("change", (e) => {
    applyScheme(e.target.value);
  });
  ////////////////////////////////////////////////////////////////////////////////////

  const input = document.getElementById("brandColorInput");
  const resetBtn = document.getElementById("customizerReset");

  if (!input) return;

  const KEY = "theme_brand_color";

  // Apply override
  function applyColor(color) {
    // Override the base variable your Tailwind mapping uses
    document.documentElement.style.setProperty("--ghost-accent-color", color);
  }

  // Remove override and fall back to CSS default
  function clearColor() {
    document.documentElement.style.removeProperty("--ghost-accent-color");
  }

  // 1) Load saved color on page load
  const saved = localStorage.getItem(KEY);
  if (saved) {
    input.value = saved;
    applyColor(saved);
  } else {
    // If nothing saved, don't override Ghost accent
    clearColor();
  }

  // 2) On change, set + save
  input.addEventListener("input", (e) => {
    const color = e.target.value;
    applyColor(color);
    localStorage.setItem(KEY, color);
  });

  // 3) Reset button clears storage + resets to Ghost accent
  if (resetBtn) {
    resetBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem(KEY);
      clearColor();
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////
   if (location.pathname.startsWith('/ghost/')) return;

                const headingSelect = document.getElementById('headingFontSelect');
                const bodySelect = document.getElementById('bodyFontSelect');
                if (!headingSelect || !bodySelect) return;

                const SYSTEM_STACK = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
                const SERIF_STACK = 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif';
                const MONO_STACK = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

                const FONT_STACKS = {
                    "Default": null, // means: use Ghost defaults

                    // shared fonts
                    "Fira Mono": `"Fira Mono", ${MONO_STACK}`,
                    "Fira Sans": `"Fira Sans", ${SYSTEM_STACK}`,
                    "IBM Plex Serif": `"IBM Plex Serif", ${SERIF_STACK}`,
                    "Inter": `"Inter", ${SYSTEM_STACK}`,
                    "JetBrains Mono": `"JetBrains Mono", ${MONO_STACK}`,
                    "Lora": `"Lora", ${SERIF_STACK}`,
                    "Manrope": `"Manrope", ${SYSTEM_STACK}`,
                    "Merriweather": `"Merriweather", ${SERIF_STACK}`,
                    "Noto Sans": `"Noto Sans", ${SYSTEM_STACK}`,
                    "Noto Serif": `"Noto Serif", ${SERIF_STACK}`,
                    "Nunito": `"Nunito", ${SYSTEM_STACK}`,
                    "Poppins": `"Poppins", ${SYSTEM_STACK}`,
                    "Roboto": `"Roboto", ${SYSTEM_STACK}`,
                    "Space Mono": `"Space Mono", ${MONO_STACK}`,

                    // heading-only extras (keep if your heading list uses these)
                    "Cardo": `"Cardo", ${SERIF_STACK}`,
                    "Chakra Petch": `"Chakra Petch", ${SYSTEM_STACK}`,
                    "Libre Baskerville": `"Libre Baskerville", ${SERIF_STACK}`,
                    "Old Standard TT": `"Old Standard TT", ${SERIF_STACK}`,
                    "Rufina": `"Rufina", ${SERIF_STACK}`,
                    "Space Grotesk": `"Space Grotesk", ${SYSTEM_STACK}`,
                    "Tenor Sans": `"Tenor Sans", ${SYSTEM_STACK}`
                };

                const GF = {
                    "Cardo": "https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&display=swap",
                    "Chakra Petch": "https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&display=swap",
                    "Fira Mono": "https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&display=swap",
                    "Fira Sans": "https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700&display=swap",
                    "IBM Plex Serif": "https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;500;600;700&display=swap",
                    "Inter": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
                    "JetBrains Mono": "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap",
                    "Libre Baskerville": "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap",
                    "Lora": "https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap",
                    "Manrope": "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap",
                    "Merriweather": "https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&display=swap",
                    "Noto Sans": "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap",
                    "Noto Serif": "https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;500;600;700&display=swap",
                    "Nunito": "https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap",
                    "Old Standard TT": "https://fonts.googleapis.com/css2?family=Old+Standard+TT:wght@400;700&display=swap",
                    "Poppins": "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
                    "Roboto": "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
                    "Rufina": "https://fonts.googleapis.com/css2?family=Rufina:wght@400;700&display=swap",
                    "Space Grotesk": "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
                    "Space Mono": "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap",
                    "Tenor Sans": "https://fonts.googleapis.com/css2?family=Tenor+Sans&display=swap"
                };

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
                        document.documentElement.style.removeProperty("--preview-font-heading");
                        document.documentElement.style.setProperty("--preview-font-heading", "var(--gh-font-heading, var(--gh-font-body))");
                        return;
                    }
                    ensureFontLoaded(name);
                    document.documentElement.style.setProperty("--preview-font-heading", FONT_STACKS[name] || SYSTEM_STACK);
                }

                function applyBody(name) {
                    if (name === "Default") {
                        document.documentElement.style.removeProperty("--preview-font-body");
                        document.documentElement.style.setProperty("--preview-font-body", "var(--gh-font-body)");
                        return;
                    }
                    ensureFontLoaded(name);
                    document.documentElement.style.setProperty("--preview-font-body", FONT_STACKS[name] || SYSTEM_STACK);
                }

                // Defaults = follow Ghost settings
                headingSelect.value = "Default";
                bodySelect.value = "Default";
                applyHeading("Default");
                applyBody("Default");

                headingSelect.addEventListener("change", () => applyHeading(headingSelect.value));
                bodySelect.addEventListener("change", () => applyBody(bodySelect.value));

                if (resetBtn) {
                    resetBtn.addEventListener("click", (e) => {
                        e.preventDefault();
                        headingSelect.value = "Default";
                        bodySelect.value = "Default";
                        applyHeading("Default");
                        applyBody("Default");
                    });
                }
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