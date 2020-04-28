const { waypoints } = require('../../lib/constants.js');
const claimHelp = require('../field-validators/claim-help/claim-help.js');

module.exports = () => {
  const pages = Object.create(null);

  pages[waypoints.CLAIM_HELP] = {
    view: 'pages/claim-help/claim-help.njk',
    fieldValidators: claimHelp,
  };

  return pages;
};
