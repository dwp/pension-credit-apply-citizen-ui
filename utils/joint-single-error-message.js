const { waypoints } = require('../lib/constants.js');

const jointSingleErrorMsg = (msgKey) => ({ journeyContext: c }) => {
  const { liveWithPartner } = c.getDataForPage(waypoints.LIVE_WITH_PARTNER)
    || Object.create(null);

  if (liveWithPartner === 'yes') {
    return `${msgKey}Joint`;
  }

  return `${msgKey}Single`;
};

module.exports = jointSingleErrorMsg;
