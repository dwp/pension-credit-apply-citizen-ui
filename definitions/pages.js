const eligibility = require('./pages/eligibility.js');
const dateOfClaim = require('./pages/date-of-claim.js');
const aboutCitizen = require('./pages/about-citizen.js');
const whereYouLive = require('./pages/where-you-live.js');
const income = require('./pages/income.js');
const money = require('./pages/money.js');
const hrtCitizen = require('./pages/hrt-citizen.js');
const hrtPartner = require('./pages/hrt-partner.js');
const contactDetails = require('./pages/contact-details.js');

module.exports = (addressServiceFactory, mountUrl, sessionTtl) => ({
  ...eligibility(sessionTtl),
  ...dateOfClaim(),
  ...aboutCitizen(),
  ...whereYouLive(addressServiceFactory, mountUrl),
  ...income(),
  ...money(),
  ...hrtCitizen(addressServiceFactory, mountUrl),
  ...hrtPartner(addressServiceFactory, mountUrl),
  ...contactDetails(addressServiceFactory, mountUrl),
});
