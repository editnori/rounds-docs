// Shared header behavior for the Rounds docs pages: theme, text size,
// reading progress, and the small-screen contents drawer.
(function () {
  var d = document.documentElement;

  var tb = document.getElementById("themeButton");
  function paintTheme() {
    var dark = d.dataset.theme === "dark";
    tb.textContent = dark ? "Light" : "Dark";
    tb.setAttribute("aria-pressed", String(dark));
  }
  tb.addEventListener("click", function () {
    d.dataset.theme = d.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("rounds-docs-theme", d.dataset.theme); } catch (e) {}
    paintTheme();
  });
  paintTheme();

  var sizeBtns = Array.prototype.slice.call(document.querySelectorAll(".text-scale button"));
  function paintSize() {
    sizeBtns.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.textSize === (d.dataset.textSize || "standard")));
    });
  }
  sizeBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      d.dataset.textSize = b.dataset.textSize;
      try { localStorage.setItem("rounds-docs-text", d.dataset.textSize); } catch (e) {}
      paintSize();
    });
  });
  paintSize();

  var bar = document.getElementById("readingProgress");
  function progress() {
    var max = d.scrollHeight - d.clientHeight;
    bar.style.width = (max > 0 ? (d.scrollTop / max) * 100 : 0) + "%";
  }
  addEventListener("scroll", progress, { passive: true });
  addEventListener("resize", progress, { passive: true });
  progress();

  var cb = document.getElementById("contentsButton");
  var rail = document.getElementById("contentsRail");
  if (cb && rail) {
    cb.addEventListener("click", function () {
      var open = rail.classList.toggle("is-open");
      cb.setAttribute("aria-expanded", String(open));
    });
    rail.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        rail.classList.remove("is-open");
        cb.setAttribute("aria-expanded", "false");
      }
    });
  }
})();
