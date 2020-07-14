const { expect } = require('chai');
const { waypoints: WP, whoMadeClaim: WMC, userTypes: UT } = require('../../../../lib/constants.js');
const Request = require('../../../helpers/fake-request.js');
const Response = require('../../../helpers/fake-response.js');
const whoMadeClaim = require('../../../../definitions/hooks/common/who-made-claim.js');

describe('Hooks: common/who-made-claim', () => {
  it('should export an object with prerender function', () => {
    expect(whoMadeClaim).to.be.an('object');
    expect(whoMadeClaim.prerender).to.be.a('function');
  });

  it('should add whoMadeClaim template var', () => {
    const req = new Request({
      [WP.WHO_MADE_CLAIM]: {
        whoMadeClaim: WMC.CLAIMANT,
      },
    });
    const res = new Response(req);
    const { prerender } = whoMadeClaim;

    prerender(req, res, () => {});

    expect(res.locals).to.have.property('whoMadeClaim').that.equals(WMC.CLAIMANT);
  });

  it('should add msgSuffix template var of "Helper" if whoMadeClaim is "charity"', () => {
    const req = new Request({
      [WP.WHO_MADE_CLAIM]: {
        whoMadeClaim: WMC.CHARITY,
      },
    });
    const res = new Response(req);
    const { prerender } = whoMadeClaim;

    prerender(req, res, () => {});

    expect(res.locals).to.have.property('msgSuffix').that.equals(UT.HELPER);
  });

  it('should add msgSuffix template var of "Helper" if whoMadeClaim is "friendOrFamily"', () => {
    const req = new Request({
      [WP.WHO_MADE_CLAIM]: {
        whoMadeClaim: WMC.FRIEND_OR_FAMILY,
      },
    });
    const res = new Response(req);
    const { prerender } = whoMadeClaim;

    prerender(req, res, () => {});

    expect(res.locals).to.have.property('msgSuffix').that.equals(UT.HELPER);
  });

  it('should add msgSuffix template var of "Helper" if whoMadeClaim is "someoneElse"', () => {
    const req = new Request({
      [WP.WHO_MADE_CLAIM]: {
        whoMadeClaim: WMC.SOMEONE_ELSE,
      },
    });
    const res = new Response(req);
    const { prerender } = whoMadeClaim;

    prerender(req, res, () => {});

    expect(res.locals).to.have.property('msgSuffix').that.equals(UT.HELPER);
  });

  it('should add msgSuffix template var of "Claimant" if whoMadeClaim is claimant', () => {
    const req = new Request({
      [WP.WHO_MADE_CLAIM]: {
        whoMadeClaim: WMC.CLAIMANT,
      },
    });
    const res = new Response(req);
    const { prerender } = whoMadeClaim;

    prerender(req, res, () => {});

    expect(res.locals).to.have.property('msgSuffix').that.equals(UT.CLAIMANT);
  });

  it('should add msgSuffix template var of "DelegatedAuthority" if whoMadeClaim is powerOfAttorney', () => {
    const req = new Request({
      [WP.WHO_MADE_CLAIM]: {
        whoMadeClaim: WMC.POWER_OF_ATTORNEY,
      },
    });
    const res = new Response(req);
    const { prerender } = whoMadeClaim;

    prerender(req, res, () => {});

    expect(res.locals).to.have.property('msgSuffix').that.equals(UT.DELEGATED_AUTHORITY);
  });

  it('should add msgSuffix template var of "DelegatedAuthority" if whoMadeClaim is appointee', () => {
    const req = new Request({
      [WP.WHO_MADE_CLAIM]: {
        whoMadeClaim: WMC.APPOINTEE,
      },
    });
    const res = new Response(req);
    const { prerender } = whoMadeClaim;

    prerender(req, res, () => {});

    expect(res.locals).to.have.property('msgSuffix').that.equals(UT.DELEGATED_AUTHORITY);
  });

  it('should add msgSuffix template var of "DelegatedAuthority" if whoMadeClaim is corporateActingBody', () => {
    const req = new Request({
      [WP.WHO_MADE_CLAIM]: {
        whoMadeClaim: WMC.CORPORATE_ACTING_BODY,
      },
    });
    const res = new Response(req);
    const { prerender } = whoMadeClaim;

    prerender(req, res, () => {});

    expect(res.locals).to.have.property('msgSuffix').that.equals(UT.DELEGATED_AUTHORITY);
  });

  it('should add msgSuffix template var of "DelegatedAuthority" if whoMadeClaim is personalActingBody', () => {
    const req = new Request({
      [WP.WHO_MADE_CLAIM]: {
        whoMadeClaim: WMC.PERSONAL_ACTING_BODY,
      },
    });
    const res = new Response(req);
    const { prerender } = whoMadeClaim;

    prerender(req, res, () => {});

    expect(res.locals).to.have.property('msgSuffix').that.equals(UT.DELEGATED_AUTHORITY);
  });

  it('should call next', (done) => {
    const req = new Request();
    const res = new Response(req);
    const { prerender } = whoMadeClaim;

    prerender(req, res, done);
  });
});
