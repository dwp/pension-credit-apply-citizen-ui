const prerender = (waypoints) => (req, res, next) => {
  const { liveWithPartner } = req.casa.journeyContext.getDataForPage(waypoints.LIVE_WITH_PARTNER)
    || Object.create(null);

  res.locals.claimType = liveWithPartner === 'yes' ? 'Joint' : 'Single';
  next();
};

module.exports = prerender;
