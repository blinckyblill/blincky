/* Cookie-banner en Google Analytics (GA4) met Consent Mode v2.
   Google-scripts en statistiekcookies worden pas geladen ná
   uitdrukkelijke toestemming. Een weigering laadt GA niet. */
(function () {
  'use strict';

  var STORAGE_KEY = 'blinckybill-cookie-consent';
  var CONSENT_VERSION = 1;
  var PLACEHOLDER_ID = 'G-XXXXXXXXXX';

  var DENIED = {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted'
  };

  function assetUrl(file) {
    var scripts = document.getElementsByTagName('script');
    var i, src, slash;
    for (i = 0; i < scripts.length; i++) {
      src = scripts[i].src || '';
      if (src.indexOf('cookie-consent.js') !== -1) {
        slash = src.lastIndexOf('/');
        return (slash >= 0 ? src.slice(0, slash + 1) : '') + file;
      }
    }
    return file;
  }

  function privacyHref() {
    var url = assetUrl('privacyverklaring.html');
    try {
      return new URL(url, window.location.href).pathname;
    } catch (e) {
      return 'privacyverklaring.html';
    }
  }

  function measurementId() {
    var id = (typeof GA_MEASUREMENT_ID === 'string' && GA_MEASUREMENT_ID) ||
      (window.GA_MEASUREMENT_ID || '');
    return String(id).trim();
  }

  function isConfiguredId(id) {
    return !!id && id !== PLACEHOLDER_ID && /^G-[A-Z0-9]+$/.test(id);
  }

  function readConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || (data.status !== 'accepted' && data.status !== 'rejected')) return null;
      if (data.version !== CONSENT_VERSION) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function writeConsent(status) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      status: status,
      version: CONSENT_VERSION,
      ts: Date.now()
    }));
  }

  function gtag() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  }

  window.gtag = window.gtag || gtag;

  var gaLoaded = false;

  function setDefaultConsent() {
    window.dataLayer = window.dataLayer || [];
    gtag('consent', 'default', Object.assign({ wait_for_update: 500 }, DENIED));
  }

  function loadGoogleAnalytics() {
    var id = measurementId();
    if (!isConfiguredId(id) || gaLoaded) {
      if (gaLoaded && window.gtag) {
        window.gtag('consent', 'update', { analytics_storage: 'granted' });
      }
      return;
    }
    gaLoaded = true;
    setDefaultConsent();
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    script.onload = function () {
      window.gtag('js', new Date());
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
      window.gtag('config', id, { anonymize_ip: true });
    };
    document.head.appendChild(script);
  }

  function clearAnalyticsCookies() {
    var cookies = document.cookie.split(';');
    var i, name, parts;
    var pathHosts = [window.location.hostname];
    if (window.location.hostname.indexOf('.') !== -1) {
      pathHosts.push('.' + window.location.hostname);
    }
    for (i = 0; i < cookies.length; i++) {
      name = cookies[i].split('=')[0].trim();
      if (!name) continue;
      if (name === '_ga' || name === '_gid' || name === '_gat' || name.indexOf('_ga_') === 0 || name.indexOf('_gcl_') === 0) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        for (parts = 0; parts < pathHosts.length; parts++) {
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + pathHosts[parts];
        }
      }
    }
  }

  function disableAnalytics() {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied'
      });
    }
    window['ga-disable-' + measurementId()] = true;
    clearAnalyticsCookies();
  }

  var bannerEl = null;

  function hideBanner() {
    if (!bannerEl) return;
    bannerEl.hidden = true;
    document.body.classList.remove('cookie-banner-open');
  }

  function showBanner() {
    if (!bannerEl) return;
    bannerEl.hidden = false;
    document.body.classList.add('cookie-banner-open');
    var first = bannerEl.querySelector('[data-cookie-reject]');
    if (first) first.focus();
  }

  function accept() {
    writeConsent('accepted');
    hideBanner();
    loadGoogleAnalytics();
  }

  function reject() {
    writeConsent('rejected');
    hideBanner();
    disableAnalytics();
  }

  function buildBanner() {
    var privacy = privacyHref();
    var region = document.createElement('div');
    region.className = 'cookie-banner';
    region.id = 'cookie-banner';
    region.setAttribute('role', 'dialog');
    region.setAttribute('aria-modal', 'false');
    region.setAttribute('aria-labelledby', 'cookie-banner-title');
    region.setAttribute('aria-describedby', 'cookie-banner-text');
    region.hidden = true;
    region.innerHTML =
      '<div class="cookie-banner-inner">' +
        '<div class="cookie-banner-copy">' +
          '<p class="cookie-banner-title" id="cookie-banner-title">Cookies op deze website</p>' +
          '<p id="cookie-banner-text">Wij gebruiken Google Analytics alleen als u daarmee instemt, zodat we kunnen zien hoeveel mensen de site bezoeken en welke pagina’s ze bekijken. Zonder toestemming plaatsen we geen statistiekcookies. De site werkt ook als u weigert. Meer informatie vindt u in onze <a href="' + privacy + '">privacyverklaring</a>.</p>' +
        '</div>' +
        '<div class="cookie-banner-actions">' +
          '<button type="button" class="btn cookie-btn-reject" data-cookie-reject>Weigeren</button>' +
          '<button type="button" class="btn cookie-btn-accept" data-cookie-accept>Accepteren</button>' +
        '</div>' +
      '</div>';
    region.querySelector('[data-cookie-reject]').addEventListener('click', reject);
    region.querySelector('[data-cookie-accept]').addEventListener('click', accept);
    document.body.appendChild(region);
    bannerEl = region;
  }

  function bindSettingsLinks() {
    document.addEventListener('click', function (event) {
      var target = event.target.closest('[data-open-cookie-settings]');
      if (!target) return;
      event.preventDefault();
      showBanner();
    });
  }

  function init() {
    setDefaultConsent();
    buildBanner();
    bindSettingsLinks();
    var consent = readConsent();
    if (!consent) {
      showBanner();
      return;
    }
    if (consent.status === 'accepted') {
      loadGoogleAnalytics();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
