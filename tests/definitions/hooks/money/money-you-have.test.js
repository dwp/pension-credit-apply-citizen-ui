const sinon = require('sinon');
const { expect } = require('chai').use(require('sinon-chai'));
const Request = require('../../../helpers/fake-request.js');
const Response = require('../../../helpers/fake-response.js');
const moneyYouHave = require('../../../../definitions/hooks/money/money-you-have.js');

describe('Hooks: money/money-you-have', () => {
  it('should export a function', () => {
    expect(moneyYouHave).to.be.a('function');
  });

  it('should return a function', () => {
    expect(moneyYouHave('test')).to.be.a('function');
  });

  it('should log moneyBackdated value if there are errors for that field', () => {
    const waypoint = 'test';
    const req = new Request(
      { [waypoint]: { moneyBackdated: 'bad' } },
      { [waypoint]: { moneyBackdated: 'error' } },
    );
    const res = new Response(req);
    req.log = { info: sinon.stub() };

    moneyYouHave(waypoint)(req, res, () => {});

    expect(req.log.info).to.be.calledWith('invalid moneyBackdated: [bad]');
  });

  it('should not log moneyBackdated value if there are no errors for that field', () => {
    const waypoint = 'test';
    const req = new Request({ [waypoint]: { moneyBackdated: '100' } });
    const res = new Response(req);
    req.log = { info: sinon.stub() };

    moneyYouHave(waypoint)(req, res, () => {});

    return expect(req.log.info).to.not.be.called;
  });

  it('should log moneyToday value if there are errors for that field', () => {
    const waypoint = 'test';
    const req = new Request(
      { [waypoint]: { moneyToday: 'bad' } },
      { [waypoint]: { moneyToday: 'error' } },
    );
    const res = new Response(req);
    req.log = { info: sinon.stub() };

    moneyYouHave(waypoint)(req, res, () => {});

    expect(req.log.info).to.be.calledWith('invalid moneyToday: [bad]');
  });

  it('should not log moneyToday value if there are no errors for that field', () => {
    const waypoint = 'test';
    const req = new Request({ [waypoint]: { moneyToday: '100' } });
    const res = new Response(req);
    req.log = { info: sinon.stub() };

    moneyYouHave(waypoint)(req, res, () => {});

    return expect(req.log.info).to.not.be.called;
  });

  it('should sanitise moneyBackdated value before logging', () => {
    const waypoint = 'test';
    const req = new Request(
      { [waypoint]: { moneyBackdated: 'bad\'"/\\!@{}?' } },
      { [waypoint]: { moneyBackdated: 'error' } },
    );
    const res = new Response(req);
    req.log = { info: sinon.stub() };

    moneyYouHave(waypoint)(req, res, () => {});

    expect(req.log.info).to.be.calledWith('invalid moneyBackdated: [bad.........]');
  });

  it('should sanitise moneyToday value before logging', () => {
    const waypoint = 'test';
    const req = new Request(
      { [waypoint]: { moneyToday: 'bad\'"/\\!@{}?' } },
      { [waypoint]: { moneyToday: 'error' } },
    );
    const res = new Response(req);
    req.log = { info: sinon.stub() };

    moneyYouHave(waypoint)(req, res, () => {});

    expect(req.log.info).to.be.calledWith('invalid moneyToday: [bad.........]');
  });

  it('should call next', (done) => {
    const req = new Request();
    const res = new Response(req);
    const hook = moneyYouHave('test');

    hook(req, res, done);
  });
});
