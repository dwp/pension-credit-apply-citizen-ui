const {
  checkLock,
  applyLock,
  submitClaim,
  clearSession,
  redirectToFinal,
  handleErrors,
} = require('./check-your-answers.js');

module.exports = (cyaUrl, plan, claimServiceFactory, httpTimeout, endSession, finalUrl) => ([
  checkLock(cyaUrl, plan, httpTimeout),
  applyLock(httpTimeout),
  submitClaim(plan, claimServiceFactory),
  clearSession(endSession),
  redirectToFinal(finalUrl),
  handleErrors(cyaUrl, plan, httpTimeout),
]);
