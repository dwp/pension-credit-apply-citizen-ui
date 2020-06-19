const prerender = (mountUrl, urlOrigin, urlWaypoint, pageTitleKey) => (req, res, next) => {
  // Check to see if we need to show the lookup failure message, then
  // immeditely clear it so it's shown only once
  if (req.session.addressLookupFailed) {
    res.locals.addressLookupFailed = true;
    req.session.addressLookupFailed = undefined;
  }

  // Build the link to the select address based on where the user has come from.
  // We purposefully do not attach the editSearchParams string here, because
  // otherwise the user will always be sent back to the edit origin after
  // performing a postcode lookup.
  res.locals.manualUrl = `${mountUrl}${urlOrigin}/${urlWaypoint}`.replace(/\/+/g, '/');

  res.locals.pageTitleKey = `manual-address:${pageTitleKey}`;

  next();
};

/*
*   This will set a hidden page key ${hiddenAddressWaypoint} with the latest address object
*   that the user has selected (wither from the lookup or manual pages)
*   hiddenAddressWaypoint value is either '_selecetd-contact-address' or
*   '_selected-home-address'
*/
const postvalidate = (hiddenAddressWaypoint, sourceAddressWaypoint) => (req, res, next) => {
  req.casa.journeyContext.setDataForPage(hiddenAddressWaypoint, {
    address: req.casa.journeyContext.getDataForPage(sourceAddressWaypoint),
    addressFrom: 'manual',
  });

  next();
};

module.exports = (mountUrl, urlOrigin, urlWaypoint, hiddenAddressWaypoint = '', sourceAddressWaypoint = '', pageTitleKey = 'pageTitle') => ({
  prerender: prerender(mountUrl, urlOrigin, urlWaypoint, pageTitleKey),
  postvalidate: postvalidate(hiddenAddressWaypoint, sourceAddressWaypoint),
});
