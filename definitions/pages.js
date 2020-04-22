const eligibility = require('./pages/eligibility.js');
const dateOfClaim = require('./pages/date-of-claim.js');

module.exports = () => ({
  ...eligibility(),
  ...dateOfClaim(),
});
