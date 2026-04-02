(function () {
  var root = document.querySelector(".mountain-backdrop");
  if (!root) return;
  var layers = root.querySelectorAll("[data-parallax]");
  var sun = root.querySelector("[data-parallax-sun]");
  var sunSpeed = sun ? parseFloat(sun.getAttribute("data-parallax-sun"), 10) : 0;
  var ticking = false;

  function update() {
    var y = window.scrollY || window.pageYOffset;
    layers.forEach(function (el) {
      var s = parseFloat(el.getAttribute("data-parallax"), 10) || 0;
      el.style.transform = "translate3d(0, " + Math.round(y * s) + "px, 0)";
    });
    if (sun) {
      var sy = sunSpeed !== 0 ? Math.round(y * sunSpeed) : 0;
      sun.style.transform = "translate3d(-50%, " + sy + "px, 0)";
    }
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  update();
})();
