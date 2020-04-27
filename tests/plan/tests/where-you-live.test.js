const { testutils: { testTraversal } } = require('@dwp/govuk-casa');
const { mergePersonaJourneys, customWaypointHandlerFactory: waypointHandlerFactory } = require('../helpers.js');
const { createApp } = require('../helpers.js');

const TIMEOUT = 5000;

describe('where-you-live', () => {
  const app = createApp();

  it('default persona', () => {
    const waypoints = mergePersonaJourneys([
      'eligibility/default',
      'about-citizen/default',
      'where-you-live/default',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  it('correspondence address', () => {
    const waypoints = mergePersonaJourneys([
      'eligibility/default',
      'about-citizen/default',
      'where-you-live/correspondence-address',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  it('care home', () => {
    const waypoints = mergePersonaJourneys([
      'eligibility/default',
      'about-citizen/in-care-home',
      'where-you-live/care-home',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  it('care home correspondence address', () => {
    const waypoints = mergePersonaJourneys([
      'eligibility/default',
      'about-citizen/in-care-home',
      'where-you-live/care-home-correspondence-address',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);
});
