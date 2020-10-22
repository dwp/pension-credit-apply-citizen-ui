const formatDateObject = require('../../../utils/format-date-object.js');
const isoStringToDateObject = require('../../../utils/iso-string-to-date-object.js');
const getSelfEmploymentVars = require('../../../utils/get-self-employment-vars.js');

const prerender = (req, res, next) => {
  const context = req.casa.journeyContext;
  const { selfEmployedEarningsDate, selfEmployedSuffix } = getSelfEmploymentVars(context);

  res.locals.selfEmployedSuffix = selfEmployedSuffix;
  res.locals.selfEmployedEarningsDate = formatDateObject(
    isoStringToDateObject(selfEmployedEarningsDate),
    { locale: context.nav.language },
  );

  next();
};

module.exports = prerender;
