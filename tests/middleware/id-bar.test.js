const { expect } = require('chai');
const { waypoints } = require('../../lib/constants.js');
const Request = require('../helpers/fake-request.js');
const Response = require('../helpers/fake-response.js');
const idBar = require('../../middleware/id-bar.js');

const app = {
  use(mw) {
    this.mw = mw;
  },
};

const fullName = 'Hammond Eggs';
const nino = 'rn001001z';

describe('Middleware: id-bar', () => {
  it('should add a middleware function', () => {
    idBar(app, waypoints);
    expect(app.mw).to.be.an.instanceOf(Function);
  });

  it('should not add idBar object if nino is not in claimant data', () => {
    const req = new Request({
      claimant: {},
    });
    const res = new Response(req);
    idBar(app, waypoints);

    app.mw(req, res, () => {});
    expect(res.locals.idBar).to.equal(undefined);
  });

  it('should not add idBar object if there is no journeyContext', () => {
    const req = new Request();
    const res = new Response(req);
    delete req.casa.journeyContext;
    idBar(app, waypoints);

    app.mw(req, res, () => {});
    expect(res.locals.idBar).to.equal(undefined);
  });

  it('should not add idBar object if there is no casa object in req', () => {
    const req = new Request();
    const res = new Response(req);
    delete req.casa;
    idBar(app, waypoints);

    app.mw(req, res, () => {});
    expect(res.locals.idBar).to.equal(undefined);
  });

  it('should add idBar object to res.locals if req.casa and req.casa.journeyContext exist, and nino is in claimant data', () => {
    const req = new Request({ claimant: { nino } });
    const res = new Response(req);
    idBar(app, waypoints);

    app.mw(req, res, () => {});
    expect(res.locals.idBar).to.be.an('object');
  });

  it('should add formatted nino to res.locals.idBar form claimant data', () => {
    const req = new Request({ claimant: { nino } });
    const res = new Response(req);
    idBar(app, waypoints);

    app.mw(req, res, () => {});
    expect(res.locals.idBar.nino).to.be.equal('RN 00 10 01 Z');
  });

  it('should add fullName to res.locals.idBar form claimant data', () => {
    const req = new Request({ claimant: { nino, fullName } });
    const res = new Response(req);
    idBar(app, waypoints);

    app.mw(req, res, () => {});
    expect(res.locals.idBar.fullName).to.be.equal(fullName);
  });

  it('should call next', (done) => {
    const req = new Request({ claimant: { nino } });
    const res = new Response(req);
    idBar(app, waypoints);

    app.mw(req, res, done);
  });
});
