const sinon = require('sinon');
const chai = require('chai');
const proxyquire = require('proxyquire');
const { name, version } = require('../../package.json');

chai.use(require('sinon-chai'));

const { expect } = chai;

const fakeLogger = require('../helpers/fake-logger.js')();

/* -------------------------------------------------------------------- Setup */

// Stub `got` and `resolve-src-timeout` functions
const gotDefaultStub = sinon.stub().returns({
  body: 'test body',
});

const ApiHelper = proxyquire('../../lib/ApiHelper.js', {
  got: gotDefaultStub,
});

/* -------------------------------------------------------------------- Tests */

describe('ApiHelper', () => {
  it('constructor() should throw an TypeError when httpTimeout not a number', () => {
    const expectedError = [TypeError, 'httpTimeout must be a number'];

    expect(() => new ApiHelper({
      httpTimeout: '4',
    })).to.throw(...expectedError);

    expect(() => new ApiHelper({
      httpTimeout: [],
    })).to.throw(...expectedError);

    expect(() => new ApiHelper({
      httpTimeout: {},
    })).to.throw(...expectedError);

    expect(() => new ApiHelper({
      httpTimeout: () => {},
    })).to.throw(...expectedError);
  });

  it('constructor() should throw an RangeError when 1 > httpTimeout > 60', () => {
    const expectedError = [RangeError, 'httpTimeout must be between 1 and 60 seconds'];

    expect(() => new ApiHelper({
      httpTimeout: 61,
    })).to.throw(...expectedError);

    expect(() => new ApiHelper({
      httpTimeout: 0,
    })).to.throw(...expectedError);
  });

  it('send() should return a Promise', () => {
    const apiHelper = new ApiHelper({
      logger: fakeLogger,
      baseUrl: 'http://dummy.test:8080',
    });
    expect(apiHelper.send('/test-url')).to.be.instanceOf(Promise);
  });

  it('send() should call got', async () => {
    const gotStub = sinon.stub().returns({ body: '' });
    const ApiHelperProxy = proxyquire('../../lib/ApiHelper.js', {
      got: gotStub,
    });

    const apiHelper = new ApiHelperProxy({
      logger: fakeLogger,
      baseUrl: 'http://dummy.test:8080',
    });
    await apiHelper.send('/test-url');

    expect(gotStub).to.be.calledOnceWith('/test-url');
  });

  it('send() resolve to a JSON object', async () => {
    const gotStub = sinon.stub().returns({
      body: {
        test: 'body',
      },
    });
    const ApiHelperProxy = proxyquire('../../lib/ApiHelper.js', {
      got: gotStub,
    });

    const apiHelper = new ApiHelperProxy({
      logger: fakeLogger,
      baseUrl: 'http://dummy.test:8080',
    });

    const result = await apiHelper.send('/test-url');

    expect(result).to.deep.equal({ test: 'body' });
  });

  it('send() should set `user-agent` header of <packageName:version>', async () => {
    const gotStub = sinon.stub().returns({
      body: {
        test: 'body',
      },
    });
    const ApiHelperProxy = proxyquire('../../lib/ApiHelper.js', {
      got: gotStub,
    });

    const apiHelper = new ApiHelperProxy({
      logger: fakeLogger,
      baseUrl: 'http://test-service-hostname:9090',
    });
    await apiHelper.send('/test-url');

    expect(gotStub).to.be.calledWith('/test-url', sinon.match.has('headers', sinon.match.has('user-agent', `${name}:${version}`)));
  });

  it('send() should set `X-Request-Id` header to options traceId property', async () => {
    const gotStub = sinon.stub().returns({
      body: {
        test: 'body',
      },
    });
    const ApiHelperProxy = proxyquire('../../lib/ApiHelper.js', {
      got: gotStub,
    });

    const apiHelper = new ApiHelperProxy({
      logger: fakeLogger,
      traceId: 'test-id',
      baseUrl: 'http://test-service-hostname:9090',
    });
    await apiHelper.send('/test-url');

    expect(gotStub).to.be.calledWith('/test-url', sinon.match.has('headers', sinon.match.has('X-Request-Id', 'test-id')));
  });

  it('send() should use custom trace ID header if traceRequestHeaderName is set', async () => {
    const gotStub = sinon.stub().returns({
      body: {
        test: 'body',
      },
    });
    const ApiHelperProxy = proxyquire('../../lib/ApiHelper.js', {
      got: gotStub,
    });

    const apiHelper = new ApiHelperProxy({
      logger: fakeLogger,
      traceId: 'test-id',
      traceRequestHeaderName: 'X-Amzn-Trace-Id',
      baseUrl: 'http://test-service-hostname:9090',
    });
    await apiHelper.send('/test-url');

    expect(gotStub).to.be.calledWith('/test-url', sinon.match.has('headers', sinon.match.has('X-Amzn-Trace-Id', 'test-id')));
  });
});
