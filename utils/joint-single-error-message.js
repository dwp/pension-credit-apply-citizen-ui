const { waypoints } = require('../lib/constants.js');

// withNIContext = include "northernIreland."" prefix in key if applicable
const jointSingleErrorMsg = (msgKey, withNIContext = false) => ({ journeyContext: c }) => {
  const { havePartner } = c.getDataForPage(waypoints.LIVE_WITH_PARTNER)
    || Object.create(null);

  let key = havePartner === 'yesLiveTogether' ? `${msgKey}Joint` : `${msgKey}Single`;

  if (withNIContext) {
    const { countryOfResidence } = c.getDataForPage(waypoints.COUNTRY_YOU_LIVE_IN)
      || Object.create(null);

    if (countryOfResidence === 'NORTHERN_IRELAND') {
      key = key.replace(':', ':northernIreland.');
    }
  }

  return key;
};

module.exports = jointSingleErrorMsg;
