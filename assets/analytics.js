(function () {
  var GA_ID = "G-HG81NR15ZB";

  // Queue events immediately — gtag.js picks these up when it loads
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });

  // Defer the actual gtag.js load until the browser is idle,
  // so its initialization reflow happens after LCP.
  function loadGA() {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
  }
  if (window.requestIdleCallback) {
    requestIdleCallback(loadGA, { timeout: 3000 });
  } else {
    window.addEventListener("load", function () { setTimeout(loadGA, 1500); });
  }

  // Track app-download clicks (queued until gtag.js flushes)
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-download]");
    if (!a) return;
    gtag("event", "app_download", {
      store: a.getAttribute("data-download"),
      location: a.getAttribute("data-location") || "unknown",
      page_path: location.pathname,
    });
  }, true);
})();
