const formatPostcode = require('../../../utils/format-postcode.js');

const postvalidateFactory = (addressServiceFactory, manualEntryWaypoint) => (req, res, next) => {
  // Sanitise postcode format removing extra spaces to ensure compatibility
  // with API format
  const pageData = Object.assign(
    Object.create(null),
    req.casa.journeyContext.getDataForPage(req.casa.journeyWaypointId),
  );
  const postcode = formatPostcode(pageData.postcode || '');

  // Call address service API
  const addressService = addressServiceFactory.create({
    logger: req.log,
    traceId: req.request_correlation_id,
  });

  req.log.trace('Calling location service ...');
  return addressService.lookupByPostcode(postcode).then((addresses) => {
    // If address lookup is sucessful but it returns no addresses, add a
    // validation error and redirect back to POSTCODE page
    if (addresses.length === 0) {
      req.log.info('Successfully looked up addresses. Got 0 results, remaining on %s', req.casa.journeyWaypointId);
      const errorMsg = 'postcode:field.postcode.noAddresses';
      // TODO: It would be nice if, in CASA, we had a proper error class for
      // validation errors
      next({
        postcode: [{
          inline: errorMsg,
          summary: errorMsg,
          focusSuffix: [],
          field: 'postcode',
          fieldHref: '#f-postcode',
        }],
      });
    } else {
      // Extract only the parts of addresses we need to avoid storing large
      // volumes of data in session
      const filteredAddresses = addresses.map((a) => ({
        uprn: a.uprn,
        postcode: a.postcode,
        completeAddressLine: a.completeAddressLine,
      }));

      req.log.info('Successfully looked up addresses. Got %s results (%s filtered)', addresses.length, filteredAddresses.length);
      req.casa.journeyContext.setDataForPage(req.casa.journeyWaypointId, Object.assign(pageData, {
        lookup_attempted: true,
        addresses: filteredAddresses,
      }));
      req.session.journeyContext = req.casa.journeyContext.toObject();
      next();
    }
  }).catch((err) => {
    // The lookup has failed (possible error in the location service). Store an
    // empty result set so the Plan can route to the manual address UI.
    req.log.error({
      stack: err.stack,
    }, 'Error finding addresses: %s', err.message);

    req.casa.journeyContext.setDataForPage(req.casa.journeyWaypointId, Object.assign(pageData, {
      lookup_attempted: true,
      addresses: [],
    }));
    req.session.journeyContext = req.casa.journeyContext.toObject();

    // As a convenience, pre-populate the entered postcode into the manual
    // address data set
    req.casa.journeyContext.setDataForPage(
      manualEntryWaypoint,
      Object.assign(Object.create(null), {
        postcode: pageData.postcode,
      }),
    );

    // Setting a flag to say look up failed so `MANUAL_ADDRESS` page can show
    // a warning
    req.session.addressLookupFailed = true;
    next();
  });
};

const prerenderFactory = (manualWaypoint, pageTitleKey) => (req, res, next) => {
  // Make a hyperlink for visiting the manual address entry waypoint
  res.locals.manualAddressUrl = `?skipto=${manualWaypoint}`;
  res.locals.pageTitleKey = `postcode:${pageTitleKey}`;
  next();
};

module.exports = (addressServiceFactory, manualEntryWaypoint = '', pageTitleKey = 'pageTitle') => ({
  postvalidate: postvalidateFactory(addressServiceFactory, manualEntryWaypoint),
  prerender: prerenderFactory(manualEntryWaypoint, pageTitleKey),
});
