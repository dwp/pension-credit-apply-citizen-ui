const needToBackDate = require('../../../utils/need-to-backdate.js');

const prerender = (req, res, next) => {
  res.locals.needToBackdate = needToBackDate(req.casa.journeyContext);
  next();
};

module.exports = prerender;
