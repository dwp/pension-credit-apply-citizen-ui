const rentOrMortgage = require('../../../utils/rent-or-mortgage.js');

const prerender = (req, res, next) => {
  res.locals.paymentType = rentOrMortgage(req.casa.journeyContext);
  next();
};

module.exports = prerender;
