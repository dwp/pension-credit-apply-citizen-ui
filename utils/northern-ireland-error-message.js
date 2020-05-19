const { waypoints } = require('../lib/constants.js');

const jointSingleErrorMsg = (msgKey) => ({ journeyContext: c }) => {
  const { countryOfResidence } = c.getDataForPage(waypoints.COUNTRY_YOU_LIVE_IN)
    || Object.create(null);

  let key = msgKey;
  if (countryOfResidence === 'NORTHERN_IRELAND') {
    key = key.replace(':', ':northernIreland.');
  }

  return key;
};

module.exports = jointSingleErrorMsg;
