const { testutils: { testTraversal } } = require('@dwp/govuk-casa');
const { mergePersonaJourneys, customWaypointHandlerFactory: waypointHandlerFactory } = require('../helpers.js');
const { createApp } = require('../helpers.js');

const TIMEOUT = 5000;

describe('hrt-partner', () => {
  const app = createApp();

  it('should not reach partner HRT', () => {
    const waypoints = mergePersonaJourneys([
      'eligibility/non-uk-national-with-partner',
      'about-citizen/with-partner',
      'hrt-citizen/default',
      'submission/check-your-answers',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  it('only partner HRT', () => {
    const waypoints = mergePersonaJourneys([
      'eligibility/has-partner',
      'about-citizen/with-partner-non-uk-national',
      'hrt-partner/default',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  it('mninimal waypoints across both citizen and partner', () => {
    const waypoints = mergePersonaJourneys([
      'eligibility/non-uk-national-with-partner',
      'about-citizen/with-partner-non-uk-national',
      'hrt-citizen/minimal',
      'hrt-partner/minimal',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);
});
