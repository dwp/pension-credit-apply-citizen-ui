const { expect } = require('chai');
const { waypoints } = require('../../../../lib/constants.js');
const Request = require('../../../helpers/fake-request.js');
const Response = require('../../../helpers/fake-response.js');
const needToBackdate = require('../../../../definitions/hooks/common/need-to-backdate.js');

describe('Hooks: common/need-to-backdate', () => {
  it('should export a function', () => {
    expect(needToBackdate).to.be.a('function');
  });

  it('should add needToBackdate template var of true if need to backdate', () => {
    const req = new Request({
      [waypoints.DATE_OF_CLAIM]: {
        dateOfClaim: { dd: '01', mm: '01', yyyy: '1900' },
      },
    });
    const res = new Response(req);

    needToBackdate(req, res, () => {});

    expect(res.locals).to.have.property('needToBackdate').that.equals(true);
  });

  it('should add needToBackdate template var of false if don\'t need to backdate', () => {
    const req = new Request({
      [waypoints.DATE_OF_CLAIM]: {
        dateOfClaim: { dd: '01', mm: '01', yyyy: '9999' },
      },
    });
    const res = new Response(req);

    needToBackdate(req, res, () => {});

    expect(res.locals).to.have.property('needToBackdate').that.equals(false);
  });

  it('should call next', (done) => {
    const req = new Request();
    const res = new Response(req);

    needToBackdate(req, res, done);
  });
});
