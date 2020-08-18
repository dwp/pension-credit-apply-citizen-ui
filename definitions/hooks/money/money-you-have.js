const sanitise = (string) => string.replace(/['"/\\!@{}?]/g, '.');

module.exports = (moneyYouHaveUrl) => (req, res, next) => {
  const pageData = req.casa.journeyContext.getDataForPage(moneyYouHaveUrl) || Object.create(null);
  const errors = req.casa.journeyContext.getValidationErrorsForPage(moneyYouHaveUrl);

  if (errors.moneyBackdated) {
    req.log.info(`invalid moneyBackdated: [${sanitise(pageData.moneyBackdated)}]`);
  }

  if (errors.moneyToday) {
    req.log.info(`invalid moneyToday: [${sanitise(pageData.moneyToday)}]`);
  }

  next();
};
