module.exports = (waypoints, consentCookieName, sessionCookieName, sessionTtl) => (req, res) => {
  res.render('pages/cookies/cookie-details.njk', {
    cookiePreferencesUrl: waypoints.COOKIE_PREFERENCES,
    sessionMinutes: sessionTtl / 60,
    consentCookieName,
    sessionCookieName,
  });
};
