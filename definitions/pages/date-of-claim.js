const { waypoints } = require('../../lib/constants.js');
const deepTrimWhitespace = require('../field-gather-modifiers/deep-trim-white-space.js');
const dateOfClaimValidation = require('../field-validators/date-of-claim/date-of-claim.js');

module.exports = () => {
  const pages = Object.create(null);

  pages[waypoints.DATE_OF_CLAIM] = {
    view: 'pages/date-of-claim/date-of-claim.njk',
    fieldValidators: dateOfClaimValidation,
    fieldGatherModifiers: {
      dateOfClaim: deepTrimWhitespace,
    },
  };

  return pages;
};
