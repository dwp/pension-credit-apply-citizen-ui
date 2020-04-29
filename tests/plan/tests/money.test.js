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

  describe('hrt routes', () => {
    it('citizen', () => {
      const waypoints = mergePersonaJourneys([
        'eligibility/non-uk-national',
        'about-citizen/default',
        'where-you-live/default',
        'income/default',
        'money/citizen-hrt',
      ]);

      return testTraversal({ app, waypoints, waypointHandlerFactory });
    }).timeout(TIMEOUT);

    it('partner', () => {
      const waypoints = mergePersonaJourneys([
        'eligibility/has-partner',
        'about-citizen/with-partner-non-uk-national',
        'where-you-live/default',
        'income/default',
        'money/partner-hrt',
      ]);

      return testTraversal({ app, waypoints, waypointHandlerFactory });
    }).timeout(TIMEOUT);

    it('disregards citizen', () => {
      const waypoints = mergePersonaJourneys([
        'eligibility/non-uk-national',
        'about-citizen/default',
        'where-you-live/default',
        'income/default',
        'money/disregards-citizen-hrt',
      ]);

      return testTraversal({ app, waypoints, waypointHandlerFactory });
    }).timeout(TIMEOUT);

    it('disregards partner', () => {
      const waypoints = mergePersonaJourneys([
        'eligibility/has-partner',
        'about-citizen/with-partner-non-uk-national',
        'where-you-live/default',
        'income/default',
        'money/disregards-partner-hrt',
      ]);

      return testTraversal({ app, waypoints, waypointHandlerFactory });
    }).timeout(TIMEOUT);
  });
});
