const prerender = (waypoint) => (req, res, next) => {
  res.locals.skipTo = `?skipto=${waypoint}${req.editSearchParams || ''}`;
  next();
};

module.exports = prerender;
