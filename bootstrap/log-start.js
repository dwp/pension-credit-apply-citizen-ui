module.exports = (req, res, next) => {
  req.startTime = process.hrtime.bigint();
  next();
};
