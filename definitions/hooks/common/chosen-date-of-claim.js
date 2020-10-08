const formatDateObject = require('../../../utils/format-date-object.js');
const isoStringToDateObject = require('../../../utils/iso-string-to-date-object.js');
const getChosenDateOfClaim = require('../../../utils/get-chosen-date-of-claim.js');

const prerender = (req, res, next) => {
  const chosenDateOfClaimISO = getChosenDateOfClaim(req.casa.journeyContext);

  // If no date of claim is available, there's nothing to add to the view
  if (chosenDateOfClaimISO === null) {
    next();
    return;
  }

  // Format date as string for this locale (eg. 12 July 2020)
  const chosenDateOfClaim = formatDateObject(
    isoStringToDateObject(chosenDateOfClaimISO),
    { locale: req.casa.journeyContext.nav.language },
  );

  // Add to view in an object so can be passed straight to i18n function
  res.locals.chosenDateOfClaim = { chosenDateOfClaim };

  next();
};

module.exports = prerender;
