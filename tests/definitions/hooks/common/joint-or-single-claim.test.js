const { expect } = require('chai');
const { waypoints } = require('../../../../lib/constants.js');
const Request = require('../../../helpers/fake-request.js');
const Response = require('../../../helpers/fake-response.js');
const jointOrSingleClaim = require('../../../../definitions/hooks/common/joint-or-single-claim.js');

describe('Hooks: common/joint-or-single-claim', () => {
  it('should export a function', () => {
    expect(jointOrSingleClaim).to.be.a('function');
  });

  it('should return a function', () => {
    expect(jointOrSingleClaim(waypoints)).to.be.a('function');
  });

  it('should add claimType template var of "Single" if not claiming with a partner', () => {
    const req = new Request({
      [waypoints.LIVE_WITH_PARTNER]: {
        liveWithPartner: 'no',
      },
    });
    const res = new Response(req);
    const hook = jointOrSingleClaim(waypoints);

    hook(req, res, () => {});

    expect(res.locals).to.have.property('claimType').that.equals('Single');
  });

  it('should add claimType template var of "Joint" if claiming with a partner', () => {
    const req = new Request({
      [waypoints.LIVE_WITH_PARTNER]: {
        liveWithPartner: 'yes',
      },
    });
    const res = new Response(req);
    const hook = jointOrSingleClaim(waypoints);

    hook(req, res, () => {});

    expect(res.locals).to.have.property('claimType').that.equals('Joint');
  });

  it('should default claimType template var to "Single"', () => {
    const req = new Request({
      [waypoints.LIVE_WITH_PARTNER]: {
        liveWithPartner: '',
      },
    });
    const res = new Response(req);
    const hook = jointOrSingleClaim(waypoints);

    hook(req, res, () => {});

    expect(res.locals).to.have.property('claimType').that.equals('Single');
  });

  it('should call next', (done) => {
    const req = new Request();
    const res = new Response(req);
    const hook = jointOrSingleClaim(waypoints);

    hook(req, res, done);
  });
});
