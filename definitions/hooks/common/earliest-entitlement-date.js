const formatDateObject = require('../../../utils/format-date-object.js');
const isoStringToDateObject = require('../../../utils/iso-string-to-date-object.js');
const getEarliestEntitlementDate = require('../../../utils/get-earliest-entitlement-date.js');

const prerender = (req, res, next) => {
  const earliestEntitlementDateISO = getEarliestEntitlementDate(req.casa.journeyContext);

  // Format date as string for this locale (eg. 12 July 2020)
  const earliestEntitlementDate = formatDateObject(
    isoStringToDateObject(earliestEntitlementDateISO),
    { locale: req.casa.journeyContext.nav.language },
  );

  // Add to view in an object so can be passed straight to i18n function
  res.locals.earliestEntitlementDate = { earliestEntitlementDate };

  next();
};

module.exports = prerender;
