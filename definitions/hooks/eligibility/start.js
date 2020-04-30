const prerender = (sessionTtl) => (req, res, next) => {
  res.locals.sessionMinutes = sessionTtl / 60;
  next();
};

module.exports = prerender;
