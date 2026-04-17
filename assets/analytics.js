(function () {
  var GA_ID = "G-NYM2PNFVJX";
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });

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
