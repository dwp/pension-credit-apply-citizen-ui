const sinon = require('sinon');
const chai = require('chai');
chai.use(require('sinon-chai'));

const { expect } = chai;

const route = require('../../../routes/actuator/metrics.js');

describe('actuator/metrics', () => {
  it('sets status to 200', () => {
    const mockRes = {
      status: sinon.stub().returns({ json: sinon.stub() }),
    };

    route(null, mockRes);

    expect(mockRes.status).to.be.calledOnceWith(200);
  });

  it('returns JSON', () => {
    const stub = sinon.stub(process, 'uptime').returns('TEST_UPTIME');

    const jsonStub = sinon.stub();

    const mockRes = {
      status: sinon.stub().returns({ json: jsonStub }),
    };

    route(null, mockRes);

    expect(jsonStub).to.be.calledOnceWith({
      uptime: 'TEST_UPTIME',
    });

    stub.restore();
  });
});
