/* =========================================================
   Laguna Systems — Layout partilhado (cabeçalho, rodapé, ícones)

   Fonte única de verdade para a navegação. Para adicionar um
   novo menu, basta acrescentar UMA entrada ao array NAV abaixo
   e criar a página correspondente. O cabeçalho e o rodapé são
   injetados automaticamente em todas as páginas.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Configuração da navegação ----------
     href  : ficheiro da página
     i18n  : chave de tradução do rótulo (ver js/i18n.js)
     match : nomes de ficheiro que marcam este item como "ativo"
  */
  var NAV = [
    { href: "index.html",           i18n: "nav.home",     match: ["", "index.html"] },
    { href: "sobre.html",           i18n: "nav.about",     match: ["sobre.html"] },
    { href: "funcionalidades.html", i18n: "nav.features",  match: ["funcionalidades.html"] },
    { href: "contactos.html",       i18n: "nav.contact",   match: ["contactos.html"] }
  ];

  var PT = (window.LAGUNA_I18N && window.LAGUNA_I18N.pt) || {};
  var t = function (key) { return PT[key] != null ? PT[key] : key; };

  /* Nome do ficheiro atual (ex.: "sobre.html"; "" na raiz) */
  var current = location.pathname.split("/").pop();

  /* ---------- Sprite de ícones (definido uma só vez) ---------- */
  var SPRITE =
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' +
    '<symbol id="i-users" viewBox="0 0 24 24"><path d="M16 11a4 4 0 100-8 4 4 0 000 8zM8 11a4 4 0 100-8 4 4 0 000 8zM2 21v-1a5 5 0 015-5h2M22 21v-1a5 5 0 00-5-5h-2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 21s-7-4.6-9.3-8.4C1 9.7 2.4 6 6 6c2 0 3.2 1.2 4 2.4C10.8 7.2 12 6 14 6c3.6 0 5 3.7 3.3 6.6C19 16.4 12 21 12 21z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-megaphone" viewBox="0 0 24 24"><path d="M3 11v2a2 2 0 002 2h1l3 5 2-1-2-4h1l7 3V6l-7 3H5a2 2 0 00-2 2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-badge" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="9" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 17c.7-2 2.3-3 4-3s3.3 1 4 3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-box" viewBox="0 0 24 24"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-truck" viewBox="0 0 24 24"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="7" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="1.8"/></symbol>' +
    '<symbol id="i-file" viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 3v4h4M9 12h6M9 16h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-layers" viewBox="0 0 24 24"><path d="M12 3l9 5-9 5-9-5 9-5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M3 13l9 5 9-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 9h18M8 3v4M16 3v4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-card" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 9h18M7 15h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-coins" viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="7" ry="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" fill="none" stroke="currentColor" stroke-width="1.8"/></symbol>' +
    '<symbol id="i-chart" viewBox="0 0 24 24"><path d="M4 20V4M4 20h16M8 20v-6M12 20v-9M16 20v-4M20 20v-8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-grid" viewBox="0 0 24 24"><rect x="4" y="4" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="13" y="4" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="4" y="13" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="13" y="13" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/></symbol>' +
    '<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-bell" viewBox="0 0 24 24"><path d="M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 19a2 2 0 004 0" fill="none" stroke="currentColor" stroke-width="1.8"/></symbol>' +
    '<symbol id="i-chat" viewBox="0 0 24 24"><path d="M4 5h16v11H9l-4 3v-3H4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 10h8M8 13h5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-doc-check" viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 3v4h4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8.5 14l2 2 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-facebook" viewBox="0 0 24 24"><path d="M14 8h3V4h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8a1 1 0 011-1z" fill="currentColor"/></symbol>' +
    '<symbol id="i-instagram" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/></symbol>' +
    '<symbol id="i-whatsapp" viewBox="0 0 24 24"><path d="M20 12a8 8 0 01-11.8 7L4 20l1-4.1A8 8 0 1120 12z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 9c0 3.3 2.7 6 6 6 .6 0 1-.6.8-1.1l-.5-1.2-1.6.4-1.8-1.8.4-1.6-1.2-.5C9.6 8 9 8.4 9 9z" fill="currentColor"/></symbol>' +
    '</defs></svg>';

  /* ---------- Dados de contacto (fonte única) ---------- */
  var SOCIAL = {
    facebook:  "https://facebook.com/lagunasystems",
    instagram: "https://instagram.com/lagunasystems",
    whatsapp:  "https://wa.me/351000000000"
  };

  /* ---------- Construção do cabeçalho ---------- */
  function buildHeader() {
    var links = NAV.map(function (item) {
      var active = item.match.indexOf(current) !== -1 ? " active" : "";
      var aria = active ? ' aria-current="page"' : "";
      return '<a href="' + item.href + '" class="nav-link' + active + '"' + aria +
             ' data-i18n="' + item.i18n + '">' + t(item.i18n) + '</a>';
    }).join("");

    return '' +
      '<header class="site-header">' +
        '<div class="container header-inner">' +
          '<a href="index.html" class="brand" aria-label="Laguna Systems">' +
            '<img src="assets/images/logo.svg" alt="Laguna Systems" width="200" height="46" />' +
          '</a>' +
          '<nav class="main-nav" id="main-nav" aria-label="Menu principal">' + links + '</nav>' +
          '<div class="header-actions">' +
            '<div class="lang-switch" role="group" aria-label="Idioma / Language">' +
              '<button type="button" data-lang="pt" class="is-active" aria-pressed="true">PT</button>' +
              '<button type="button" data-lang="en" aria-pressed="false">EN</button>' +
              '<button type="button" data-lang="es" aria-pressed="false">ES</button>' +
            '</div>' +
            '<a href="contactos.html" class="btn btn-primary btn-sm" data-i18n="cta.demo">' + t("cta.demo") + '</a>' +
            '<button class="nav-toggle" id="nav-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="main-nav">' +
              '<span></span><span></span><span></span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</header>';
  }

  /* ---------- Construção do rodapé ---------- */
  function buildFooter() {
    var footerLinks = NAV.map(function (item) {
      return '<a href="' + item.href + '" data-i18n="' + item.i18n + '">' + t(item.i18n) + '</a>';
    }).join("");

    return '' +
      '<footer class="site-footer">' +
        '<div class="container footer-grid">' +
          '<div class="footer-brand">' +
            '<img src="assets/images/logo-light.svg" alt="Laguna Systems" width="200" height="46" />' +
            '<p data-i18n="footer.tagline">' + t("footer.tagline") + '</p>' +
          '</div>' +
          '<nav class="footer-links" aria-label="Rodapé">' +
            '<h5 data-i18n="footer.nav">' + t("footer.nav") + '</h5>' + footerLinks +
          '</nav>' +
          '<div class="footer-social">' +
            '<h5 data-i18n="footer.follow">' + t("footer.follow") + '</h5>' +
            '<div class="social-row">' +
              '<a href="' + SOCIAL.facebook + '" target="_blank" rel="noopener" aria-label="Facebook"><svg class="ic"><use href="#i-facebook"/></svg></a>' +
              '<a href="' + SOCIAL.instagram + '" target="_blank" rel="noopener" aria-label="Instagram"><svg class="ic"><use href="#i-instagram"/></svg></a>' +
              '<a href="' + SOCIAL.whatsapp + '" target="_blank" rel="noopener" aria-label="WhatsApp"><svg class="ic"><use href="#i-whatsapp"/></svg></a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="container footer-bottom">' +
          '<span>&copy; <span id="year"></span> Laguna Systems. <span data-i18n="footer.rights">' + t("footer.rights") + '</span></span>' +
        '</div>' +
      '</footer>';
  }

  /* ---------- Injeção no DOM ---------- */
  // Sprite de ícones no início do body
  var spriteHost = document.createElement("div");
  spriteHost.innerHTML = SPRITE;
  document.body.insertBefore(spriteHost.firstChild, document.body.firstChild);

  var headerMount = document.getElementById("site-header");
  if (headerMount) headerMount.outerHTML = buildHeader();

  var footerMount = document.getElementById("site-footer");
  if (footerMount) footerMount.outerHTML = buildFooter();

  // Expõe os contactos para outras partes (ex.: formulário)
  window.LAGUNA_SOCIAL = SOCIAL;
})();
