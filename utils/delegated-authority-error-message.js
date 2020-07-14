// Appends the Delegated Authority suffix to the error message string.
// Depending on the type of user, we will show 1 of up to 3 different contextual
// error messages.
//
// eg. setting your error message as daErrorMessage('page:error') will return:
// 'page:errorDelegatedAuthority' for a power of attorney or
// 'page:errorHelper' for a charity
const { waypoints } = require('../lib/constants.js');
const daSuffix = require('./delegated-authority-suffix.js');

const daErrorMessage = (errorMsg) => ({ journeyContext: c }) => {
  const { whoMadeClaim } = c.getDataForPage(waypoints.WHO_MADE_CLAIM) || {};
  const msgSuffix = daSuffix(whoMadeClaim);
  return `${errorMsg}${msgSuffix}`;
};

module.exports = daErrorMessage;
