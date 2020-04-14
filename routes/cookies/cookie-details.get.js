module.exports = (waypoints, consentCookieName, sessionCookieName) => (req, res) => {
  res.render('pages/cookies/cookie-details.njk', {
    cookiePreferencesUrl: waypoints.COOKIE_PREFERENCES,
    consentCookieName,
    sessionCookieName,
  });
};
