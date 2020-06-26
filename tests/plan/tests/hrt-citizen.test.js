const { testutils: { testTraversal } } = require('@dwp/govuk-casa');
const { mergePersonaJourneys, customWaypointHandlerFactory: waypointHandlerFactory } = require('../helpers.js');
const { createApp } = require('../helpers.js');

const TIMEOUT = 5000;

describe('hrt-citizen', () => {
  const app = createApp();

  const defaultJourneys = [
    'eligibility/default',
    'about-citizen/default',
    'where-you-live/default',
    'income/default',
    'money/default',
  ];

  const partnerJourneys = [
    'eligibility/has-partner',
    'about-citizen/with-partner',
    'where-you-live/default',
    'income/default',
    'money/default',
  ];

  it('default persona (HRT needed)', () => {
    const waypoints = mergePersonaJourneys([
      ...defaultJourneys,
      'hrt-citizen/default',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  it('no HRT', () => {
    const waypoints = mergePersonaJourneys([
      ...defaultJourneys,
      'hrt-citizen/no-hrt',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  it('minimal HRT questions (rightToReside yes, lived2Years no)', () => {
    const waypoints = mergePersonaJourneys([
      ...defaultJourneys,
      'hrt-citizen/minimal-reside-yes',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  it('minimal HRT questions (rightToReside no, lived2Years Yes)', () => {
    const waypoints = mergePersonaJourneys([
      ...defaultJourneys,
      'hrt-citizen/minimal-2-years-yes',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  it('partner', () => {
    const waypoints = mergePersonaJourneys([
      ...partnerJourneys,
      'hrt-citizen/partner',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  it('partner, no claimant HRT', () => {
    const waypoints = mergePersonaJourneys([
      ...partnerJourneys,
      'hrt-citizen/no-hrt-partner',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);
});
