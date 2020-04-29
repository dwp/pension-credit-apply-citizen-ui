const { waypoints: WP } = require('../../lib/constants.js');

// Test if the user needs to take the HRT
const hasPartner = (c) => c.data[WP.LIVE_WITH_PARTNER].liveWithPartner === 'yes';

const citizenNeedsHRT = (r, c) => (
  c.data[WP.YOUR_NATIONALITY].rightToReside === 'no' || c.data[WP.YOUR_NATIONALITY].lived2Years === 'no'
);

const partnerNeedsHRT = (r, c) => (
  hasPartner(c) && (c.data[WP.PARTNER_NATIONALITY].partnerRightToReside === 'no' || c.data[WP.PARTNER_NATIONALITY].partnerLived2Years === 'no')
);

const onlyCitizenNeedsHRT = (r, c) => (
  citizenNeedsHRT(r, c) && (!hasPartner(c) || !partnerNeedsHRT(r, c))
);

const onlyPartnerNeedsHRT = (r, c) => (
  !citizenNeedsHRT(r, c) && hasPartner(c) && partnerNeedsHRT(r, c)
);

const noHRTNeeded = (r, c) => !citizenNeedsHRT(r, c) && !partnerNeedsHRT(r, c);

module.exports = {
  hasPartner,
  citizenNeedsHRT,
  partnerNeedsHRT,
  onlyCitizenNeedsHRT,
  onlyPartnerNeedsHRT,
  noHRTNeeded,
};
