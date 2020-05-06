module.exports = (waypoints, consentCookieName, sessionCookieName, sessionTtl) => (req, res) => {
  res.render('pages/cookies/cookie-details.njk', {
    cookiePolicyUrl: waypoints.COOKIE_POLICY,
    sessionMinutes: sessionTtl / 60,
    consentCookieName,
    sessionCookieName,
  });
};
