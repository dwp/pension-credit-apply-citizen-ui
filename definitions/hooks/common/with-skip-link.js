const prerender = (waypoint) => (req, res, next) => {
  res.locals.skipTo = `?skipto=${waypoint}`;
  next();
};

module.exports = prerender;
