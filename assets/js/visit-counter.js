(() => {
  const loader = document.getElementById('site-analytics');
  const token = loader && loader.dataset.cloudflareToken;
  const preferenceKey = 'site-exclude-own-visits';
  const url = new URL(window.location.href);
  const action = url.searchParams.get('analytics');
  let excluded = false;
  let saved = true;

  // Remove cookies and the preference left by the previous Google integration.
  document.cookie.split(';').forEach((entry) => {
    const name = entry.split('=')[0].trim();
    if (name !== '_ga' && !name.startsWith('_ga_')) return;
    ['', '; domain=' + location.hostname, '; domain=.' + location.hostname].forEach((domain) => {
      document.cookie = name + '=; Max-Age=0; path=/' + domain;
    });
  });
  try { window.localStorage.removeItem('site-analytics-consent'); }
  catch (_) { /* No local preference needs to be migrated. */ }

  try { excluded = window.localStorage.getItem(preferenceKey) === '1'; }
  catch (_) { /* Counting does not require local storage. */ }

  if (action === 'off' || action === 'on') {
    excluded = action === 'off';
    try {
      if (excluded) window.localStorage.setItem(preferenceKey, '1');
      else window.localStorage.removeItem(preferenceKey);
    } catch (_) { saved = false; }
    url.searchParams.delete('analytics');
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  }

  const status = document.querySelector('[data-analytics-browser-status]');
  if (status) {
    if (excluded) {
      status.textContent = saved
        ? 'Visits from this browser are excluded from the statistics.'
        : 'This visit is excluded, but your browser could not save the preference for future visits.';
    } else {
      status.textContent = token
        ? 'Visits from this browser can be counted.'
        : 'Visit counting is not enabled yet.';
    }
  }

  if (excluded || !/^[a-fA-F0-9]{32}$/.test(token || '')) return;
  const beacon = document.createElement('script');
  beacon.type = 'module';
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  beacon.dataset.cfBeacon = JSON.stringify({ token });
  document.head.appendChild(beacon);
})();
