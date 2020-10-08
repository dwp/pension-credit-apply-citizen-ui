const formatDateObject = require('../../../utils/format-date-object.js');
const isoStringToDateObject = require('../../../utils/iso-string-to-date-object.js');
const getOfferedDateOfClaim = require('../../../utils/get-offered-date-of-claim.js');

const prerender = (req, res, next) => {
  const offeredDateOfClaimISO = getOfferedDateOfClaim(req.casa.journeyContext);

  // If no date of claim is available, there's nothing to add to the view
  if (offeredDateOfClaimISO === null) {
    next();
    return;
  }

  // Format date as string for this locale (eg. 12 July 2020)
  const offeredDateOfClaim = formatDateObject(
    isoStringToDateObject(offeredDateOfClaimISO),
    { locale: req.casa.journeyContext.nav.language },
  );

  // Add to view in an object so can be passed straight to i18n function
  res.locals.offeredDateOfClaim = { offeredDateOfClaim };

  next();
};

module.exports = prerender;
