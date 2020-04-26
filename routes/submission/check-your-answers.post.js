const {
  checkLock,
  applyLock,
  submitClaim,
  clearSession,
  redirectToFinal,
  handleErrors,
} = require('./check-your-answers.js');

module.exports = (plan, claimServiceFactory, httpTimeout, endSession, finalUrl) => ([
  checkLock,
  applyLock(httpTimeout),
  submitClaim(plan, claimServiceFactory),
  clearSession(endSession),
  redirectToFinal(finalUrl),
  handleErrors,
]);
