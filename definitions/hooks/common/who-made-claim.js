const { waypoints } = require('../../../lib/constants.js');
const daSuffix = require('../../../utils/delegated-authority-suffix.js');

const prerender = (req, res, next) => {
  const { whoMadeClaim } = req.casa.journeyContext.getDataForPage(waypoints.WHO_MADE_CLAIM) || {};
  res.locals.whoMadeClaim = whoMadeClaim;
  res.locals.msgSuffix = daSuffix(whoMadeClaim);
  next();
};

module.exports = { prerender };
