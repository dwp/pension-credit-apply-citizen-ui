const { testutils: { testTraversal } } = require('@dwp/govuk-casa');
const { mergePersonaJourneys, customWaypointHandlerFactory: waypointHandlerFactory } = require('../helpers.js');
const { createApp } = require('../helpers.js');

const TIMEOUT = 5000;

describe('money', () => {
  const app = createApp();

  const defaultJourneys = [
    'eligibility/default',
    'about-citizen/default',
    'where-you-live/default',
    'income/default',
  ];

  it('default persona', () => {
    const waypoints = mergePersonaJourneys([
      ...defaultJourneys,
      'money/default',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  describe('disregards routes', () => {
    const routes = [
      'disregards-over-10k-backdated',
      'disregards-over-10k-today',
      'disregards-second-property',
    ];

    routes.forEach((route) => {
      it(`${route}`, () => testTraversal({
        app,
        waypoints: mergePersonaJourneys([
          ...defaultJourneys,
          `money/${route}`,
        ]),
        waypointHandlerFactory,
      })).timeout(TIMEOUT);
    });
  });
});
