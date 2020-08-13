const { testutils: { testTraversal } } = require('@dwp/govuk-casa');
const { mergePersonaJourneys, customWaypointHandlerFactory: waypointHandlerFactory } = require('../helpers.js');
const { createApp } = require('../helpers.js');

const TIMEOUT = 5000;

describe('hrt-partner', () => {
  const app = createApp();

  const defaultJourneys = [
    'eligibility/has-partner',
    'about-citizen/with-partner',
    'where-you-live/default',
    'income/default',
    'money/default',
    'hrt-citizen/no-hrt-partner',
  ];

  it('default persona (HRT needed)', () => {
    const waypoints = mergePersonaJourneys([
      ...defaultJourneys,
      'hrt-partner/default',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  it('no HRT', () => {
    const waypoints = mergePersonaJourneys([
      ...defaultJourneys,
      'hrt-partner/no-hrt',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  it('minimal HRT questions (rightToReside yes, lived2Years no)', () => {
    const waypoints = mergePersonaJourneys([
      ...defaultJourneys,
      'hrt-partner/minimal-reside-yes',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  it('minimal HRT questions (rightToReside no, lived2Years Yes)', () => {
    const waypoints = mergePersonaJourneys([
      ...defaultJourneys,
      'hrt-partner/minimal-2-years-yes',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  it('asylum seeker', () => {
    const waypoints = mergePersonaJourneys([
      ...defaultJourneys,
      'hrt-partner/asylum-seeker',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);
});
