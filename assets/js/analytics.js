(() => {
  const loader = document.getElementById('site-analytics');
  const banner = document.getElementById('analytics-consent');
  const measurementId = loader && loader.dataset.measurementId;
  if (!banner || !/^G-[A-Z0-9]+$/.test(measurementId || '')) return;

  const storageKey = 'site-analytics-consent';
  const disableKey = 'ga-disable-' + measurementId;
  let loaded = false;

  function storedChoice() {
    try { return window.localStorage.getItem(storageKey); }
    catch (_) { return null; }
  }

  function remember(choice) {
    try { window.localStorage.setItem(storageKey, choice); }
    catch (_) { /* The choice still applies for this page. */ }
  }

  function clearAnalyticsCookies() {
    document.cookie.split(';').forEach((entry) => {
      const name = entry.split('=')[0].trim();
      if (name !== '_ga' && !name.startsWith('_ga_')) return;
      ['', '; domain=' + location.hostname, '; domain=.' + location.hostname].forEach((domain) => {
        document.cookie = name + '=; Max-Age=0; path=/' + domain;
      });
    });
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window[disableKey] = true;
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });

  function enableAnalytics() {
    window[disableKey] = false;
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    if (loaded) return;
    loaded = true;
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(tag);
  }

  function choose(choice) {
    remember(choice);
    banner.hidden = true;
    if (choice === 'granted') enableAnalytics();
    else {
      window[disableKey] = true;
      clearAnalyticsCookies();
    }
  }

  document.querySelectorAll('[data-analytics-choice]').forEach((button) => {
    button.addEventListener('click', () => choose(button.dataset.analyticsChoice));
  });
  document.querySelectorAll('[data-analytics-preferences]').forEach((button) => {
    button.addEventListener('click', () => {
      banner.hidden = false;
      banner.querySelector('button').focus();
    });
  });

  const choice = storedChoice();
  if (choice === 'granted') enableAnalytics();
  else if (choice !== 'denied') banner.hidden = false;
})();
