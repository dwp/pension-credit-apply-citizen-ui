const sinon = require('sinon');
const proxyquire = require('proxyquire');
const getSPA = require('get-state-pension-date');
const { testutils: { testTraversal } } = require('@dwp/govuk-casa');
const { loadPersonaJourney, customWaypointHandlerFactory: waypointHandlerFactory } = require('../helpers.js');

const now = new Date();
const todayUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
const twoMonthsFromNow = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 2, now.getDate()));
const getStatePensionDateStub = sinon.stub(getSPA, 'getStatePensionDate');

// Stub getStatePensionDate to return a SPA date 2 months in the future for
// advance claims
getStatePensionDateStub
  .withArgs('1111-01-01', 'male')
  .callsFake(() => twoMonthsFromNow);

// Stub getStatePensionDate to return a SPA date of today
getStatePensionDateStub
  .withArgs('1111-01-02', 'male')
  .callsFake(() => todayUTC);

getSPA.getStatePensionDate.callThrough();

const { createApp } = proxyquire('../helpers.js', {
  'get-state-pension-date': {
    getStatePensionDate: getSPA.getStatePensionDate,
    '@global': true,
  },
});

const TIMEOUT = 5000;

describe('eligibility', () => {
  const app = createApp();

  it('should traverse the default persona correctly', () => testTraversal({
    app,
    waypoints: loadPersonaJourney('eligibility/default'),
    waypointHandlerFactory,
  })).timeout(TIMEOUT);

  describe('ineligible routes', () => {
    const routes = [
      'ineligible-state-pension-not-claimed',
      'ineligible-claim-includes-children',
      'ineligible-not-in-uk',
      'ineligible-too-young',
      'ineligible-partner-too-young-cant-get-pahb',
      'ineligible-partner-too-young-no-pahb',
    ];

    routes.forEach((route) => {
      it(`${route}`, () => testTraversal({
        app,
        waypoints: loadPersonaJourney(`eligibility/${route}`),
        waypointHandlerFactory,
      })).timeout(TIMEOUT);
    });
  });

  describe('date of claim routes', () => {
    const routes = [
      'date-of-claim-today',
      'date-of-claim-advance',
      'date-of-claim-different',
      'date-of-claim-past-one-period-abroad',
      'date-of-claim-past-one-period-abroad-medical',
      'date-of-claim-past-more-than-one-period-abroad',
    ];

    routes.forEach((route) => {
      it(`${route}`, () => testTraversal({
        app,
        waypoints: loadPersonaJourney(`eligibility/${route}`),
        waypointHandlerFactory,
      })).timeout(TIMEOUT);
    });
  });

  describe('partner routes', () => {
    const routes = [
      'has-partner',
      'has-young-partner-gets-pahb',
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
