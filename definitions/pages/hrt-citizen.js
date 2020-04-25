const { waypoints } = require('../../lib/constants.js');
const returnedToUk = require('../field-validators/hrt-citizen/returned-to-uk.js');
const nationalityDetails = require('../field-validators/hrt-citizen/nationality-details.js');
const ukSponsorship = require('../field-validators/hrt-citizen/uk-sponsorship.js');
const sponsorshipDetails = require('../field-validators/hrt-citizen/sponsorship-details.js');
const asylumSeeker = require('../field-validators/hrt-citizen/asylum-seeker.js');

module.exports = () => {
  const pages = Object.create(null);

  pages[waypoints.HRT_CITIZEN_RETURNED_TO_UK] = {
    view: 'pages/hrt-citizen/returned-to-uk.njk',
    fieldValidators: returnedToUk,
  };

  pages[waypoints.HRT_CITIZEN_NATIONALITY_DETAILS] = {
    view: 'pages/hrt-citizen/nationality-details.njk',
    fieldValidators: nationalityDetails,
  };

  pages[waypoints.HRT_CITIZEN_UK_SPONSORSHIP] = {
    view: 'pages/hrt-citizen/uk-sponsorship.njk',
    fieldValidators: ukSponsorship,
  };

  pages[waypoints.HRT_CITIZEN_SPONSORSHIP_DETAILS] = {
    view: 'pages/hrt-citizen/sponsorship-details.njk',
    fieldValidators: sponsorshipDetails,
  };

  pages[waypoints.HRT_CITIZEN_ASYLUM_SEEKER] = {
    view: 'pages/hrt-citizen/asylum-seeker.njk',
    fieldValidators: asylumSeeker,
  };

  return pages;
};
