const { testutils: { testTraversal } } = require('@dwp/govuk-casa');
const { mergePersonaJourneys, customWaypointHandlerFactory: waypointHandlerFactory } = require('../helpers.js');
const { createApp } = require('../helpers.js');

const TIMEOUT = 5000;

describe('contact-details', () => {
  const app = createApp();

  const defaultJourneys = [
    'eligibility/default',
    'about-citizen/default',
    'where-you-live/default',
    'income/default',
    'money/default',
    'hrt-citizen/default',
  ];

  describe('claimant or helper', () => {
    it('default persona', () => {
      const waypoints = mergePersonaJourneys([
        ...defaultJourneys,
        'contact-details/default',
      ]);

      return testTraversal({ app, waypoints, waypointHandlerFactory });
    }).timeout(TIMEOUT);

    it('contact formats', () => {
      const waypoints = mergePersonaJourneys([
        ...defaultJourneys,
        'contact-details/contact-formats',
      ]);

      return testTraversal({ app, waypoints, waypointHandlerFactory });
    }).timeout(TIMEOUT);

    it('different correspondence address', () => {
      const waypoints = mergePersonaJourneys([
        ...defaultJourneys,
        'contact-details/correspondence-address',
      ]);

      return testTraversal({ app, waypoints, waypointHandlerFactory });
    }).timeout(TIMEOUT);
  });

  describe('delegated authority', () => {
    it('default persona', () => {
      const waypoints = mergePersonaJourneys([
        ...defaultJourneys,
        'contact-details/delegated-authority',
      ]);

      return testTraversal({ app, waypoints, waypointHandlerFactory });
    }).timeout(TIMEOUT);

    it('corporate acting body', () => {
      const waypoints = mergePersonaJourneys([
        ...defaultJourneys,
        'contact-details/delegated-authority-cab',
      ]);

      return testTraversal({ app, waypoints, waypointHandlerFactory });
    }).timeout(TIMEOUT);

    it('contact formats', () => {
      const waypoints = mergePersonaJourneys([
        ...defaultJourneys,
        'contact-details/delegated-authority-contact-formats',
      ]);

      return testTraversal({ app, waypoints, waypointHandlerFactory });
    }).timeout(TIMEOUT);
  });
});
