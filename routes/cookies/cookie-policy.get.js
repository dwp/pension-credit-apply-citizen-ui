module.exports = (waypoints) => (req, res) => {
  const { cookieConsentError } = req.session;
  const { t } = res.locals;
  req.session.cookieConsentError = undefined;
  res.render('pages/cookies/cookie-policy.njk', {
    cookieDetailsUrl: waypoints.COOKIE_DETAILS,
    formErrorsGovukArray: cookieConsentError && [{
      text: t(cookieConsentError),
      href: '#f-cookieConsent',
    }],
    formErrors: {
      cookieConsent: cookieConsentError && [{
        summary: cookieConsentError,
        inline: cookieConsentError,
      }],
    },
  });
};