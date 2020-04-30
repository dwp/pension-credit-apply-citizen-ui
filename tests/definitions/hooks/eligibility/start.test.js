const { expect } = require('chai');
const Request = require('../../../helpers/fake-request.js');
const Response = require('../../../helpers/fake-response.js');
const start = require('../../../../definitions/hooks/eligibility/start.js');

describe('Hooks: eligibility/start', () => {
  it('should export a function', () => {
    expect(start).to.be.a('function');
  });

  it('should return a function', () => {
    expect(start(60)).to.be.a('function');
  });

  it('should add sessionMinutes template var as sessionTtl / 60', () => {
    const req = new Request();
    const res = new Response(req);
    const hook = start(60);

    hook(req, res, () => {});

    expect(res.locals).to.have.property('sessionMinutes').that.equals(1);
  });

  it('should call next', (done) => {
    const req = new Request();
    const res = new Response(req);
    const hook = start(60);

    hook(req, res, done);
  });
});
