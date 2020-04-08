const sinon = require('sinon');
const chai = require('chai');
chai.use(require('sinon-chai'));

const { expect } = chai;

const indexApp = require('../../../routes/actuator/index.js');

const mockPackageJson = {
  name: 'test',
  description: 'test',
  version: 'test',
};

describe('actuator/index', () => {
  it('should return health endpoint', () => {
    const mockExpressApp = {
      get: sinon.stub(),
    };
    indexApp(mockExpressApp, mockPackageJson);

    expect(mockExpressApp.get).to.be.calledWith('/health');
  });

  it('should return metrics endpoint', () => {
    const mockExpressApp = {
      get: sinon.stub(),
    };
    indexApp(mockExpressApp, mockPackageJson);

    expect(mockExpressApp.get).to.be.calledWith('/metrics');
  });

  it('should return info endpoint', () => {
    const mockExpressApp = {
      get: sinon.stub(),
    };
    indexApp(mockExpressApp, mockPackageJson);

    expect(mockExpressApp.get).to.be.calledWith('/info');
  });
});
