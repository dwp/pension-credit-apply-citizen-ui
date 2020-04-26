const buildClaim = require('../../lib/build-claim.js');

const checkLock = (req, res, next) => {
  // If another submission is currently under way, ask the user to wait
  const now = (new Date()).getTime();
  if (req.session.submissionLock && req.session.submissionLock > now) {
    req.log.info(`Submission lock present (expires ${(new Date(req.session.submissionLock)).toISOString()})`);
    res.render('pages/submission/check-your-answers.njk', {
      error: 'check-your-answers:error.submission-locked',
    });
  } else {
    req.log.info('Submission lock is not present');
    next();
  }
};

const applyLock = (httpTimeout) => (req, res, next) => {
  // Create a temporary lock
  const expiryTime = (new Date()).getTime() + (httpTimeout * 1000);
  req.log.info(`Setting new submission lock to expire in ${httpTimeout} seconds`);
  req.session.submissionLock = expiryTime;
  req.session.save(next);
};

const submitClaim = (plan, claimServiceFactory) => (req, res, next) => {
  req.log.info('Preparing to submit claim');

  req.log.info('Building claim object');
  const claim = buildClaim(plan, req.casa.journeyContext);

  req.log.trace('Creating claim service');
  const claimService = claimServiceFactory.create({
    logger: req.log,
    traceId: req.request_correlation_id,
  });

  req.log.trace('Calling claim service');
  return claimService.submitClaim(claim).then(() => {
    req.log.info('Claim submitted successfully');
    next();
  }).catch(next);
};

const clearSession = (endSession) => (req, res, next) => {
  req.log.info('Clearing session following successful claim submission');
  // TODO: Maybe clear session rather than empty and regenerate so that if they
  // press SUBMIT twice, they will be able to reach the WHAT NEXT page instead
  // of a session timeout error?
  return endSession(req).then(() => {
    req.log.info('Session ended successfully');
    next();
  }).catch(next);
};

const redirectToFinal = (finalUrl) => (req, res) => {
  req.log.info(`Redirecting to final destination, ${finalUrl}`);
  res.status(302).redirect(finalUrl);
};

const handleErrors = (err, req, res, next) => { /* eslint-disable-line no-unused-vars */
  if (err.name === 'HTTPError') {
    req.log.error({ err: err.response.body }, 'Error response from Claim Service. Claim not submitted.');
  } else if (err.name === 'TimeoutError') {
    req.log.error('Call to Claim Service timed out. Claim may or may not have been submitted.');
  } else if (err.name === 'ParseError') {
    req.log.error({ err: err.response }, 'Response from Claim Service could not be parsed. Claim may or may not have been submitted.');
  } else {
    req.log.error(err, 'Unexpected error whilst submitting claim. Claim not submitted.');
  }

  // Clear the lock
  delete req.session.submissionLock;

  res.render('pages/submission/check-your-answers.njk', {
    error: 'check-your-answers:error.claim-service-failure',
  });
};

module.exports = {
  checkLock,
  applyLock,
  submitClaim,
  clearSession,
  redirectToFinal,
  handleErrors,
};
