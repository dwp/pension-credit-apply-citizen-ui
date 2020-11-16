const { testutils: { testTraversal } } = require('@dwp/govuk-casa');
const { mergePersonaJourneys, customWaypointHandlerFactory: waypointHandlerFactory } = require('../helpers.js');
const { createApp } = require('../helpers.js');

const TIMEOUT = 5000;

describe('where-you-live', () => {
  const app = createApp();

  const defaultJourneys = [
    'eligibility/default',
    'about-citizen/default',
  ];

  it('default persona', () => {
    const waypoints = mergePersonaJourneys([
      ...defaultJourneys,
      'where-you-live/default',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);

  describe('home ownership', () => {
    describe('own', () => {
      it('mortgage', () => {
        const waypoints = mergePersonaJourneys([
          ...defaultJourneys,
          'where-you-live/home-own-mortgage',
        ]);

        return testTraversal({ app, waypoints, waypointHandlerFactory });
      }).timeout(TIMEOUT);
    });

    describe('rent', () => {
      it('default', () => {
        const waypoints = mergePersonaJourneys([
          ...defaultJourneys,
          'where-you-live/home-rent',
        ]);

        return testTraversal({ app, waypoints, waypointHandlerFactory });
      }).timeout(TIMEOUT);

      it('21 year lease', () => {
        const waypoints = mergePersonaJourneys([
          ...defaultJourneys,
          'where-you-live/home-rent-21-year-lease',
        ]);

        return testTraversal({ app, waypoints, waypointHandlerFactory });
      }).timeout(TIMEOUT);
    });

    describe('shared ownership', () => {
      it('default', () => {
        const waypoints = mergePersonaJourneys([
          ...defaultJourneys,
          'where-you-live/home-shared',
        ]);

        return testTraversal({ app, waypoints, waypointHandlerFactory });
      }).timeout(TIMEOUT);

      it('21 year lease', () => {
        const waypoints = mergePersonaJourneys([
          ...defaultJourneys,
          'where-you-live/home-shared-21-year-lease',
        ]);

        return testTraversal({ app, waypoints, waypointHandlerFactory });
      }).timeout(TIMEOUT);

      it('mortgage', () => {
        const waypoints = mergePersonaJourneys([
          ...defaultJourneys,
          'where-you-live/home-shared-mortgage',
        ]);

        return testTraversal({ app, waypoints, waypointHandlerFactory });
      }).timeout(TIMEOUT);
    });

    describe('other', () => {
      it('default', () => {
        const waypoints = mergePersonaJourneys([
          ...defaultJourneys,
          'where-you-live/home-other',
        ]);

        return testTraversal({ app, waypoints, waypointHandlerFactory });
      }).timeout(TIMEOUT);

      it('mortgage', () => {
        const waypoints = mergePersonaJourneys([
          ...defaultJourneys,
          'where-you-live/home-other-mortgage',
        ]);

        return testTraversal({ app, waypoints, waypointHandlerFactory });
      }).timeout(TIMEOUT);
    });
  });

  it('care home', () => {
    const waypoints = mergePersonaJourneys([
      'eligibility/default',
      'about-citizen/in-care-home',
      'where-you-live/care-home',
    ]);

    return testTraversal({ app, waypoints, waypointHandlerFactory });
  }).timeout(TIMEOUT);
});
