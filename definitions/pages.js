const eligibility = require('./pages/eligibility.js');
const dateOfClaim = require('./pages/date-of-claim.js');
const aboutCitizen = require('./pages/about-citizen.js');
const hrtCitizen = require('./pages/hrt-citizen.js');
const hrtPartner = require('./pages/hrt-partner.js');

module.exports = (addressServiceFactory, mountUrl) => ({
  ...eligibility(),
  ...dateOfClaim(),
  ...aboutCitizen(),
  ...hrtCitizen(addressServiceFactory, mountUrl),
  ...hrtPartner(addressServiceFactory, mountUrl),
});
