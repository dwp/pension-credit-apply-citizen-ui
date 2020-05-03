const buildClaim = require('../../lib/build-claim.js');
const buildCya = require('../../definitions/cya/index.js');

module.exports = (plan) => (req, res) => {
  // Build the claim from which the CYA is constructed
  const claim = buildClaim(plan, req.casa.journeyContext);

  // Render page
  res.render('pages/submission/check-your-answers.njk', {
    sections: buildCya(res.locals.t, req.casa.journeyContext, claim),
    formButtonText: res.locals.t('check-your-answers:buttonText'),
  });
};
