//#####################################  Apply color scheme class to body
(function () {
  const scheme = document.body.dataset.colorScheme;
  if (!scheme) return;

  const slug = scheme.trim().toLowerCase().replace(/\s+/g, "-");

  document.body.classList.add(`${slug}`);
})();

//####################################  Apply random color theme to specific box
document.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("randomColorBox");

  // Predefined combinations
  const themes = [
    "color-theme-1",
    "color-theme-2",
    "color-theme-3",
    "color-theme-4",
    "color-theme-5",
    "color-theme-6",
  ];

  // Pick a random one
  const randomClass = themes[Math.floor(Math.random() * themes.length)];
  box.classList.add(randomClass);
});

//###################################  Apply sticky / animated header behavior and classes

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




