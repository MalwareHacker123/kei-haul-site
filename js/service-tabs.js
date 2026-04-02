(function () {
  var hub = document.querySelector(".service-hub");
  if (!hub) return;

  var bar = hub.querySelector(".service-tab-bar");
  var tabs = bar ? [].slice.call(bar.querySelectorAll(".service-tab")) : [];
  var panels = [].slice.call(hub.querySelectorAll(".service-panel"));
  var orderMap = [
    { appliances: 2, home: 1, region: 3 },
    { appliances: 1, home: 2, region: 3 },
    { appliances: 1, region: 2, home: 3 }
  ];

  function setActive(key) {
    var idx = key === "appliances" ? 0 : key === "home" ? 1 : 2;
    var order = orderMap[idx];
    tabs.forEach(function (tab) {
      var k = tab.getAttribute("data-key");
      tab.style.order = String(order[k] != null ? order[k] : 2);
      var selected = k === key;
      tab.setAttribute("aria-selected", selected ? "true" : "false");
      tab.classList.toggle("is-active", selected);
    });
    panels.forEach(function (p) {
      var on = p.id === "svc-" + key;
      p.classList.toggle("is-active", on);
      p.hidden = !on;
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      setActive(tab.getAttribute("data-key"));
    });
  });

  function keyFromHash() {
    var h = location.hash.replace(/^#/, "");
    if (h.indexOf("svc-") !== 0) return null;
    return h.slice(4);
  }

  var k = keyFromHash();
  if (k === "appliances" || k === "home" || k === "region") {
    setActive(k);
  } else {
    setActive("appliances");
  }

  window.addEventListener("hashchange", function () {
    var key = keyFromHash();
    if (key === "appliances" || key === "home" || key === "region") {
      setActive(key);
      hub.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
})();
