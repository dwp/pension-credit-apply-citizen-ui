const qs = require('querystring');
const setConsentCookie = require('../utils/set-consent-cookie.js');

module.exports = (app, mountUrl = '/', consentCookieName, waypoints) => {
  const consecutiveSlashes = /\/+/g;

  // URL to cookie policy page
  const cookiePolicyUrl = `${mountUrl}${waypoints.COOKIE_POLICY}`;

  // Set template options for cookie consent banner
  app.use((req, res, next) => {
    // Get cookie banner flash messages (did you accpet / reject)
    if (req.session) {
      res.locals.cookieChoiceMade = req.session.cookieChoiceMade;
      req.session.cookieChoiceMade = undefined;
    }

    // Add current consent cookie value to templates
    if (req.cookies[consentCookieName]) {
      res.locals.cookieMessage = req.cookies[consentCookieName];
    } else {
      res.locals.cookieMessage = 'unset';
    }

    // Url to submit consent to (used in banner)
    res.locals.cookieConsentSubmit = waypoints.COOKIE_CONSENT;

    // Set backto query
    const { pathname, search } = new URL(String(req.originalUrl), 'http://dummy.test/');
    const currentUrl = (pathname + search).replace(consecutiveSlashes, '/');

    // If already on cookie policy page, don't need set backto again
    if (pathname === cookiePolicyUrl) {
      res.locals.cookiePolicyUrl = currentUrl;
    } else {
      res.locals.cookiePolicyUrl = `${cookiePolicyUrl}?${qs.stringify({ backto: currentUrl })}`;
    }

    next();
  });

  // Handle setting consent cookie from banner submisson
  app.post(`${mountUrl}${waypoints.COOKIE_CONSENT}/:cookieMethod`, (req, res) => {
    const { cookieMethod } = req.params;

    if (cookieMethod === 'reject' || cookieMethod === 'accept') {
      setConsentCookie(req, res, consentCookieName, cookieMethod);
    }

    return req.session.save(() => res.redirect('back'));
  });
};
