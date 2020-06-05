const { expect } = require('chai');
const { waypoints: WP } = require('../../../../lib/constants.js');
const Request = require('../../../helpers/fake-request.js');
const Response = require('../../../helpers/fake-response.js');
const shareRentMortgageHook = require('../../../../definitions/hooks/where-you-live/share-rent-mortgage.js');

describe('Hooks: where-you-live/share-rent-mortgage', () => {
  it('should export a function', () => {
    expect(shareRentMortgageHook).to.be.a('function');
  });

  it('should add paymentType template var', () => {
    const req = new Request({ [WP.HOME_OWNERSHIP]: { homeOwnership: 'own' } });
    const res = new Response(req);

    shareRentMortgageHook(req, res, () => {});

    expect(res.locals).to.have.property('paymentType').that.equals('Mortgage');
  });

  it('should call next', (done) => {
    const req = new Request();
    const res = new Response(req);

    shareRentMortgageHook(req, res, done);
  });
});
