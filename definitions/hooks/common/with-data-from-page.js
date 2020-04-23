const withDataFromPage = (config) => (req, res, next) => {
  Object.keys(config).forEach((page) => {
    const pageData = req.casa.journeyContext.getDataForPage(page)
      || Object.create(null);

    config[page].forEach((field) => {
      res.locals[field] = pageData[field];
    });
  });

  next();
};

module.exports = withDataFromPage;
