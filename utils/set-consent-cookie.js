const oneYearInMilliseconds = 1000 * 60 * 60 * 24 * 365;

// Set the consent cookie and flash message to consent banner
const setConsentCookie = (req, res, consentCookieName, cookieValue) => {
  res.cookie(consentCookieName, cookieValue, {
    path: '/',
    maxAge: oneYearInMilliseconds,
    httpOnly: false,
  });
  req.session.cookieChoiceMade = true;
};

module.exports = setConsentCookie;
