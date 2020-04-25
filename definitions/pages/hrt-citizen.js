const { waypoints } = require('../../lib/constants.js');
const returnedToUk = require('../field-validators/hrt-citizen/returned-to-uk.js');
const nationalityDetails = require('../field-validators/hrt-citizen/nationality-details.js');

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

  return pages;
};
