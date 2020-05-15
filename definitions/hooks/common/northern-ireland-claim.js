const prerender = (waypoints) => (req, res, next) => {
  const { countryOfResidence } = req.casa.journeyContext.getDataForPage(
    waypoints.COUNTRY_YOU_LIVE_IN,
  ) || Object.create(null);

  res.locals.isNorthernIrelandClaim = countryOfResidence === 'NORTHERN_IRELAND';
  res.locals.northerIrelandPrefix = countryOfResidence === 'NORTHERN_IRELAND' ? 'northernIreland.' : '';

  next();
};

module.exports = prerender;
