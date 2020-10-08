const prerender = (sessionTtl) => (req, res, next) => {
  res.locals.sessionMinutes = sessionTtl / 60;
  next();
};

const postvalidate = (startUrl) => (req, res, next) => {
  const { applicationDate } = req.casa.journeyContext.getDataForPage(startUrl) || {};

  // If applicationDate is no yet set, set it to today. Do not override it if it
  // is already set, it must remain the date they first started the application.
  if (!applicationDate) {
    const todayISO = new Date(Date.now()).toISOString().substr(0, 10);

    req.casa.journeyContext.setDataForPage(startUrl, {
      applicationDate: todayISO,
    });

    req.session.save(next);
    return;
  }

  next();
};

module.exports = (sessionTtl, startUrl) => ({
  prerender: prerender(sessionTtl),
  postvalidate: postvalidate(startUrl),
});
