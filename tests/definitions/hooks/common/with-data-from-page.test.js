const { expect } = require('chai');
const Request = require('../../../helpers/fake-request.js');
const Response = require('../../../helpers/fake-response.js');
const withDataFromPage = require('../../../../definitions/hooks/common/with-data-from-page.js');

const noop = () => {};

describe('Hooks: common/with-data-from-page', () => {
  it('should export a function', () => {
    expect(withDataFromPage).to.be.a('function');
  });

  it('should return a function', () => {
    expect(withDataFromPage({})).to.be.a('function');
  });

  it('should add field values from pages to res.locals', () => {
    const req = new Request({
      test1: {
        name: 'Hammond Eggs',
        colour: 'Purple',
      },
      test2: {
        hatSize: 'Large',
      },
    });

    const res = new Response(req);
    const hook = withDataFromPage({
      test1: ['name', 'colour'],
      test2: ['hatSize'],
    });

    hook(req, res, noop);

    expect(res.locals.name).to.equal('Hammond Eggs');
    expect(res.locals.colour).to.equal('Purple');
    expect(res.locals.hatSize).to.equal('Large');
  });

  it('should not throw if field data doesn\'t exist', () => {
    const req = new Request({
      test: {
        colour: 'Purple',
      },
    });
    const res = new Response(req);
    const hook = withDataFromPage({
      test: ['name'],
    });

    expect(() => hook(req, res, noop)).to.not.throw();
    return expect(res.locals.name).to.be.undefined;
  });

  it('should not throw if page data doesn\'t exist', () => {
    const req = new Request({});
    const res = new Response(req);
    const hook = withDataFromPage({
      test: ['name'],
    });

    expect(() => hook(req, res, noop)).to.not.throw();
    return expect(res.locals.name).to.be.undefined;
  });

  it('should call next', (done) => {
    const req = new Request({});
    const res = new Response(req);
    const hook = withDataFromPage({
      test: ['name'],
    });

    hook(req, res, done);
  });
});
