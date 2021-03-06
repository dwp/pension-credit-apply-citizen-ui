const moment = require('moment');
const buildClaim = require('../../lib/build-claim.js');
const buildCya = require('../../definitions/cya/index.js');

const renderPage = (cyaUrl, req, res, plan, httpTimeout, journeyContext, tplContext) => {
  res.render('pages/submission/check-your-answers.njk', {
    formButtonText: res.locals.t('check-your-answers:buttonText'),
    sections: buildCya(
      res.locals.t,
      journeyContext,
      buildClaim(plan, journeyContext, req.session.language),
      cyaUrl,
    ),
    ...tplContext,
    httpTimeout,
  });
};

const checkLock = (cyaUrl, plan, httpTimeout) => (req, res, next) => {
  // If another submission is currently under way, ask the user to wait
  const now = (new Date()).getTime();
  if (req.session.submissionLock && req.session.submissionLock > now) {
    req.log.info(`Submission lock present (expires ${(new Date(req.session.submissionLock)).toISOString()})`);
    renderPage(cyaUrl, req, res, plan, httpTimeout, req.casa.journeyContext, {
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
  const claim = buildClaim(plan, req.casa.journeyContext, req.session.language);

  req.log.trace('Creating claim service');
  const claimService = claimServiceFactory.create({
    logger: req.log,
    traceId: req.request_correlation_id,
  });

  // Determine some data to pass onto final "what happens next" page
  req.claimCompleteData = {
    hasBonds: claim.hasBonds(),
    selfEmployed: claim.selfEmployed(),
    ownsAdditionalProperty: claim.ownsAdditionalProperty(),
    abroadMoreThanOnceOrForMedical: claim.moreThanOnePeriodAbroad() || claim.abroadForMedical(),
    contactDate: moment().add(4, 'weeks').locale(req.casa.journeyContext.nav.language || 'en').format('DD MMMM YYYY'),
    isNorthernIrelandClaim: claim.isNorthernIrelandClaim(),
  };

  req.log.trace('Calling claim service');
  return claimService.submitClaim(claim).then(() => {
    req.log.info('Claim submitted successfully');
    next();
  }).catch(next);
};

const clearSession = (endSession) => (req, res, next) => {
  req.log.info('Clearing session following successful claim submission');
  return endSession(req).then(() => {
    req.log.info('Session ended successfully');

    // Set data to indicate which parts of the what happens next page should
    // be revealed
    req.log.info(`Saving completion data to new session (${req.session.id})`);
    req.session.claimCompleteData = req.claimCompleteData;
    req.session.save(next);
  }).catch(next);
};

const redirectToFinal = (finalUrl) => (req, res) => {
  req.log.info(`Redirecting to final destination, ${finalUrl}`);
  res.status(302).redirect(finalUrl);
};

/* eslint-disable-next-line no-unused-vars */
const handleErrors = (cyaUrl, plan, httpTimeout) => (err, req, res, next) => {
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

  renderPage(cyaUrl, req, res, plan, httpTimeout, req.casa.journeyContext, {
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
