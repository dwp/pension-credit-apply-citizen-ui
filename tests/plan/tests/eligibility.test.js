const { testutils: { testTraversal } } = require('@dwp/govuk-casa');
const { loadPersonaJourney, customWaypointHandlerFactory: waypointHandlerFactory } = require('../helpers.js');
const { createApp } = require('../helpers.js');

const TIMEOUT = 5000;

describe('eligibility', () => {
  const app = createApp();

  it('should traverse the default persona correctly', () => testTraversal({
    app,
    waypoints: loadPersonaJourney('eligibility/default'),
    waypointHandlerFactory,
  })).timeout(TIMEOUT);

  describe('partner routes', () => {
    const routes = [
      'has-partner',
      'has-young-partner',
    ];

    routes.forEach((route) => {
      it(`${route}`, () => testTraversal({
        app,
        waypoints: loadPersonaJourney(`eligibility/${route}`),
        waypointHandlerFactory,
      })).timeout(TIMEOUT);
    });
  });

  describe('ineligible routes', () => {
    const routes = [
      'ineligible-state-pension-not-claimed',
      'ineligible-claim-includes-children',
      'ineligible-not-in-uk',
      'ineligible-too-young',
      'ineligible-partner-too-young',
    ];

    routes.forEach((route) => {
      it(`${route}`, () => testTraversal({
        app,
        waypoints: loadPersonaJourney(`eligibility/${route}`),
        waypointHandlerFactory,
      })).timeout(TIMEOUT);
    });
  });
});
