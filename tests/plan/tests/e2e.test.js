const { testutils: { testTraversal } } = require('@dwp/govuk-casa');
const { mergePersonaJourneys, customWaypointHandlerFactory: waypointHandlerFactory } = require('../helpers.js');
const { createApp } = require('../helpers.js');

const TIMEOUT = 30000;

describe('end-to-end', () => {
  const app = createApp();

  const personas = [
    'eligibility/default',
    'about-citizen/default',
    'where-you-live/default',
    'income/default',
    'money/default',
    'hrt-citizen/default',
    'contact-details/default',
    'submission/check-your-answers',
  ];

  it('should traverse the default persona correctly', () => testTraversal({
    app,
    waypoints: mergePersonaJourneys(personas),
    waypointHandlerFactory,
  })).timeout(TIMEOUT);
});
