/* =========================================================
   Laguna Systems — Interações da página
   Corre depois de js/layout.js (que injeta cabeçalho e rodapé).
   ========================================================= */
(function () {
  "use strict";

  var DICT = window.LAGUNA_I18N || {};
  var CODES = window.LAGUNA_LANG_CODES || { pt: "pt-PT", en: "en", es: "es" };
  var STORAGE_KEY = "laguna-lang";

  /* ---------- Tradução ---------- */
  function applyLanguage(lang) {
    var dict = DICT[lang];
    if (!dict) { lang = "pt"; dict = DICT.pt; }

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] == null) return;
      if (key === "meta.title") {
        document.title = dict[key];
      } else if (el.tagName === "META") {
        el.setAttribute("content", dict[key]);
      } else {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-ph");
      if (dict[key] != null) el.setAttribute("placeholder", dict[key]);
    });

    document.documentElement.setAttribute("lang", CODES[lang] || "pt-PT");

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function detectInitialLang() {
    var saved;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved && DICT[saved]) return saved;
    var nav = (navigator.language || "pt").slice(0, 2).toLowerCase();
    if (DICT[nav]) return nav;
    return "pt"; // por omissão: Português
  }

  document.querySelectorAll(".lang-switch button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLanguage(btn.getAttribute("data-lang"));
    });
  });

  applyLanguage(detectInitialLang());

  /* ---------- Menu mobile ---------- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Animação de entrada ---------- */
  var revealEls = document.querySelectorAll(
    ".feature-card, .contact-card, .about-copy, .about-art, .section-head, .group-title, .cta-inner, .home-area-card"
  );
  revealEls.forEach(function (el) { el.setAttribute("data-reveal", ""); });
  var revealObs = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el) { revealObs.observe(el); });

  /* ---------- Formulário de contacto (mailto) ---------- */
  var form = document.getElementById("contact-form");
  var note = document.getElementById("form-note");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var data = new FormData(form);
      var subject = encodeURIComponent("Pedido de demonstração — Laguna Systems");
      var body = encodeURIComponent(
        "Nome: " + (data.get("name") || "") + "\n" +
        "E-mail: " + (data.get("email") || "") + "\n" +
        "Negócio: " + (data.get("business") || "") + "\n\n" +
        (data.get("message") || "")
      );
      window.location.href = "mailto:laguna.systems.sft@gmail.com?subject=" + subject + "&body=" + body;
      if (note) note.hidden = false;
      form.reset();
    });
  }

  /* ---------- Ano no rodapé ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
