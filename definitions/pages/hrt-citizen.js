const { waypoints } = require('../../lib/constants.js');
const returnedToUk = require('../field-validators/hrt-citizen/returned-to-uk.js');

module.exports = () => {
  const pages = Object.create(null);

  pages[waypoints.HRT_CITIZEN_RETURNED_TO_UK] = {
    view: 'pages/hrt-citizen/returned-to-uk.njk',
    fieldValidators: returnedToUk,
  };

  return pages;
};
