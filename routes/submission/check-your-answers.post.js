const {
  checkLock,
  applyLock,
  submitClaim,
  clearSession,
  handleErrors,
} = require('./check-your-answers.js');

module.exports = (claimServiceFactory, httpTimeout, endSession, finalUrl) => ([
  checkLock,
  applyLock(httpTimeout),
  submitClaim(claimServiceFactory),
  clearSession(endSession, finalUrl),
  handleErrors,
]);
