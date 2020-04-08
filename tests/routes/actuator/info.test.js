const sinon = require('sinon');
const chai = require('chai');
chai.use(require('sinon-chai'));

const { expect } = chai;

const infoApp = require('../../../routes/actuator/info.js');

describe('actuator/info', () => {
  it('throws exception when packageJson is not an object', () => {
    expect(() => {
      infoApp('a string');
    }).to.throw(TypeError, /^Package details must be an object$/);
  });

  it('throws exception when packageJson.name is missing', () => {
    expect(() => {
      infoApp({});
    }).to.throw(TypeError, /^Package name must be a string$/);
  });

  it('throws exception when packageJson.name is not an object', () => {
    expect(() => {
      infoApp({
        name: false,
      });
    }).to.throw(TypeError, /^Package name must be a string$/);
  });

  it('throws exception when packageJson.description is not an object', () => {
    expect(() => {
      infoApp({
        name: 'name',
        description: false,
      });
    }).to.throw(TypeError, /^Package description must be a string$/);
  });

  it('throws exception when packageJson.version is missing', () => {
    expect(() => {
      infoApp({
        name: 'name',
      });
    }).to.throw(TypeError, /^Package version must be a string$/);
  });

  it('throws exception when packageJson.version is not an object', () => {
    expect(() => {
      infoApp({
        name: 'name',
        version: false,
      });
    }).to.throw(TypeError, /^Package version must be a string$/);
  });

  it('returns a function', () => {
    const route = infoApp({
      name: 'name',
      version: '1.2.3',
    });

    expect(route).to.be.an.instanceOf(Function);
  });

  it('sets status to 200', () => {
    const route = infoApp({
      name: 'name',
      version: '1.2.3',
    });

    const mockRes = {
      status: sinon.stub().returns({ json: sinon.stub() }),
    };

    route(null, mockRes);

    expect(mockRes.status).to.be.calledOnceWith(200);
  });

  it('returned function returns JSON', () => {
    const route = infoApp({
      name: 'TEST_NAME',
      description: 'TEST_DESCRIPTION',
      version: 'TEST_VERSION',
    });

    const jsonStub = sinon.stub();

    const mockRes = {
      status: sinon.stub().returns({ json: jsonStub }),
    };

    route(null, mockRes);

    expect(jsonStub).to.be.calledOnceWith({
      app: {
        name: 'TEST_NAME',
        description: 'TEST_DESCRIPTION',
        version: 'TEST_VERSION',
      },
      node: {
        version: process.versions.node,
      },
    });
  });
});
