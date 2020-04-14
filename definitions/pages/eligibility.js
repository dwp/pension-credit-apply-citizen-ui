const { waypoints } = require('../../lib/constants.js');
const claimedStatePensionValidation = require('../field-validators/eligibility/claimed-state-pension.js');
const withSkipLink = require('../hooks/common/with-skip-link.js');

module.exports = () => {
  const pages = Object.create(null);

  pages[waypoints.START] = {
    view: 'pages/start.njk',
    hooks: {
      prerender: withSkipLink(waypoints.CLAIMED_STATE_PENSION),
    },
  };

  pages[waypoints.CLAIMED_STATE_PENSION] = {
    view: 'pages/eligibility/claimed-state-pension.njk',
    fieldValidators: claimedStatePensionValidation,
  };

  pages[waypoints.STATE_PENSION_NOT_CLAIMED] = {
    view: 'pages/eligibility/state-pension-not-claimed.njk',
  };

  return pages;
};
