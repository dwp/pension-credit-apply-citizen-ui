const getSelfEmploymentVars = require('../../../utils/get-self-employment-vars.js');

const prerender = (req, res, next) => {
  const {
    selfEmployedEarningsDate, selfEmployedSuffix,
  } = getSelfEmploymentVars(req.casa.journeyContext);

  // Add to view in an object so can be passed straight to i18n function
  res.locals.selfEmployedEarningsDate = { selfEmployedEarningsDate };
  res.locals.selfEmployedSuffix = selfEmployedSuffix;

  next();
};

module.exports = prerender;
