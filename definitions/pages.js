const eligibility = require('./pages/eligibility.js');
const dateOfClaim = require('./pages/date-of-claim.js');
const aboutCitizen = require('./pages/about-citizen.js');
const hrtCitizen = require('./pages/hrt-citizen.js');

module.exports = () => ({
  ...eligibility(),
  ...dateOfClaim(),
  ...aboutCitizen(),
  ...hrtCitizen(),
});
