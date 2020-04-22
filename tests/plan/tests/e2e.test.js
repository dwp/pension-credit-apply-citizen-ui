const { testutils: { testTraversal } } = require('@dwp/govuk-casa');
const { loadPersonaJourney, customWaypointHandlerFactory: waypointHandlerFactory } = require('../helpers.js');
const { createApp } = require('../helpers.js');

const TIMEOUT = 30000;

describe('end-to-end', () => {
  const app = createApp();

  it('should traverse the default persona correctly', () => testTraversal({
    app,
    waypoints: loadPersonaJourney('default'),
    waypointHandlerFactory,
  })).timeout(TIMEOUT);
});
