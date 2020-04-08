const formatNino = require('../utils/format-nino.js');

module.exports = (app) => {
  app.use((req, res, next) => {
    if (req.casa && req.casa.journeyContext) {
      const { nino, fullName } = req.casa.journeyContext.getDataForPage('claimant')
        || Object.create(null);

      res.locals.idBar = nino && Object.assign(Object.create(null), {
        nino: formatNino(nino),
        fullName,
      });
    }

    next();
  });
};
