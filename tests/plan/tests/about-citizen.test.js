const { testutils: { testTraversal } } = require('@dwp/govuk-casa');
const { mergePersonaJourneys, customWaypointHandlerFactory: waypointHandlerFactory } = require('../helpers.js');
const { createApp } = require('../helpers.js');

const TIMEOUT = 5000;

describe('about-citizen', () => {
  const app = createApp();

  it('default persona', () => {
    const waypoints = mergePersonaJourneys([
      'eligibility/default',
      'about-citizen/default',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  it('contact formats', () => {
    const waypoints = mergePersonaJourneys([
      'eligibility/default',
      'about-citizen/contact-formats',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  it('partner details', () => {
    const waypoints = mergePersonaJourneys([
      'eligibility/has-partner',
      'about-citizen/with-partner',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  it('contact formats and partner details', () => {
    const waypoints = mergePersonaJourneys([
      'eligibility/has-partner',
      'about-citizen/with-partner-contact-formats',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);
});
