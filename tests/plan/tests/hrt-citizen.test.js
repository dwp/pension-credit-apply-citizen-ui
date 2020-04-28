const { testutils: { testTraversal } } = require('@dwp/govuk-casa');
const { mergePersonaJourneys, customWaypointHandlerFactory: waypointHandlerFactory } = require('../helpers.js');
const { createApp } = require('../helpers.js');

const TIMEOUT = 5000;

describe('hrt-citizen', () => {
  const app = createApp();

  it('should not reach HRT', () => {
    const waypoints = mergePersonaJourneys([
      'eligibility/default',
      'about-citizen/default',
      'where-you-live/default',
      'income/default',
      'claim-help/default',
      'submission/check-your-answers',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  it('all waypoints', () => {
    const waypoints = mergePersonaJourneys([
      'eligibility/non-uk-national',
      'about-citizen/default',
      'where-you-live/default',
      'income/default',
      'hrt-citizen/default',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  it('mninimal waypoints', () => {
    const waypoints = mergePersonaJourneys([
      'eligibility/non-uk-national',
      'about-citizen/default',
      'where-you-live/default',
      'income/default',
      'hrt-citizen/minimal',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);
});
