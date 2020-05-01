const {
  checkLock,
  applyLock,
  submitClaim,
  clearSession,
  redirectToFinal,
  handleErrors,
} = require('./check-your-answers.js');

module.exports = (cyaUrl, plan, claimServiceFactory, httpTimeout, endSession, finalUrl) => ([
  checkLock(cyaUrl, plan),
  applyLock(httpTimeout),
  submitClaim(plan, claimServiceFactory),
  clearSession(endSession),
  redirectToFinal(finalUrl),
  handleErrors(cyaUrl, plan),
]);
