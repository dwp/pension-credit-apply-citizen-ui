const { expect } = require('chai');
const Request = require('../../../helpers/fake-request.js');
const Response = require('../../../helpers/fake-response.js');
const withSkipLink = require('../../../../definitions/hooks/common/with-skip-link.js');

describe('Hooks: common/with-skip-link', () => {
  it('should export a function', () => {
    expect(withSkipLink).to.be.a('function');
  });

  it('should return a function', () => {
    expect(withSkipLink('test')).to.be.a('function');
  });

  it('should add given waypoint as skip link template var', () => {
    const req = new Request();
    const res = new Response(req);
    const waypoint = 'test';
    const hook = withSkipLink(waypoint);

    hook(req, res, () => {});

    expect(res.locals).to.have.property('skipTo').that.equals(`?skipto=${waypoint}`);
  });

  it('should call next', (done) => {
    const req = new Request();
    const res = new Response(req);
    const hook = withSkipLink('test');

    hook(req, res, done);
  });
});
