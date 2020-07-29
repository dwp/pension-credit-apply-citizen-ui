const prerender = (waypoints) => (req, res, next) => {
  const { havePartner } = req.casa.journeyContext.getDataForPage(waypoints.LIVE_WITH_PARTNER)
    || Object.create(null);

  // If claimant does not live with partner, this is considered a "single" claim
  res.locals.claimType = havePartner === 'yesLiveTogether' ? 'Joint' : 'Single';
  next();
};

module.exports = prerender;
