const eligibility = require('./pages/eligibility.js');
const dateOfClaim = require('./pages/date-of-claim.js');
const aboutCitizen = require('./pages/about-citizen.js');
const whereYouLive = require('./pages/where-you-live.js');
const income = require('./pages/income.js');
const hrtCitizen = require('./pages/hrt-citizen.js');
const hrtPartner = require('./pages/hrt-partner.js');

module.exports = (addressServiceFactory, mountUrl) => ({
  ...eligibility(),
  ...dateOfClaim(),
  ...aboutCitizen(),
  ...whereYouLive(addressServiceFactory, mountUrl),
  ...income(),
  ...hrtCitizen(addressServiceFactory, mountUrl),
  ...hrtPartner(addressServiceFactory, mountUrl),
});
