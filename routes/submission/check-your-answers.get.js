const buildCya = require('../../definitions/cya/index.js');

module.exports = (plan) => (req, res) => {
  // Traverse the Plan to determine whih waypoints have been visited
  const traversed = plan.traverse(req.casa.journeyContext);

  // Render page
  res.render('pages/submission/check-your-answers.njk', {
    sections: buildCya(res.locals.t, req.casa.journeyContext, traversed),
  });
};
