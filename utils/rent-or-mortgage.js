const { waypoints } = require('../lib/constants.js');

const rentOrMortgage = (journeyContext) => {
  const { homeOwnership } = journeyContext.getDataForPage(waypoints.HOME_OWNERSHIP)
    || Object.create(null);

  if (homeOwnership === 'own') {
    return 'Mortgage';
  }

  if (homeOwnership === 'rent') {
    return 'Rent';
  }

  return 'Either';
};

module.exports = rentOrMortgage;
