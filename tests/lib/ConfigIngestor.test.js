const { expect } = require('chai');

const ConfigIngestor = require('../../lib/ConfigIngestor.js');

const requiredVars = {};

describe('ConfigIngestor', () => {
  it('should return an Object', () => {
    const ci = ConfigIngestor(requiredVars);
    expect(ci).to.be.an('object');
  });

  it('should return an Object with frozen properties', () => {
    const ci = ConfigIngestor(requiredVars);
    const setPort = ci.PORT;
    try {
      ci.PORT = 'TEST';
      ci._test_prop = true;
    } catch (e) {
      //
    }

    expect(ci.PORT).equals(setPort);
    return expect(ci._test_prop).to.be.undefined;
  });

  it('REDIS_HOSTS should assign an array by default', () => {
    const ci = ConfigIngestor(requiredVars);
    expect(ci.REDIS_HOSTS).to.deep.equal([]);
  });

  it('REDIS_HOSTS should throw a TypeError if not a string', () => {
    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        CLAIMSERVICE_API_ENDPOINT: 'dummy',
        REDIS_HOSTS: 1234,
      });
    }).to.throw(TypeError, /^REDIS_HOSTS must be a string$/);
  });

  it('REDIS_HOSTS should return an array containing only valid urls', () => {
    const ci = ConfigIngestor({
      ...requiredVars,
      CLAIMSERVICE_API_ENDPOINT: 'dummy',
      REDIS_HOSTS: 'P4ss$!@host-with.valid-ch4racters_in_it:1234,not valid,valid@hostname:8000,hostname:9000',
    });
    expect(ci.REDIS_HOSTS).to.deep.equal([{
      password: 'P4ss$!',
      host: 'host-with.valid-ch4racters_in_it',
      port: '1234',
    }, {
      password: 'valid',
      host: 'hostname',
      port: '8000',
    }, {
      password: null,
      host: 'hostname',
      port: '9000',
    }]);
  });

  it('REDIS_HOSTS should generate parsed objects if string is properly formatted', () => {
    const ci = ConfigIngestor({
      ...requiredVars,
      CLAIMSERVICE_API_ENDPOINT: 'dummy',
      REDIS_HOSTS: 'P4ss$!@host-with.valid-ch4racters_in_it:1234',
    });
    expect(ci.REDIS_HOSTS).to.deep.equal([{
      password: 'P4ss$!',
      host: 'host-with.valid-ch4racters_in_it',
      port: '1234',
    }]);
  });

  it('ConfigIngestor should throw if invalid LOG_LEVEL given', () => {
    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        CLAIMSERVICE_API_ENDPOINT: 'dummy',
        LOG_LEVEL: 'invalid-test',
      });
    }).to.throw(ReferenceError, /^LOG_LEVEL must be one of: fatal, error, warn, info, debug, trace, silent. Given invalid-test$/);
  });

  it('TRACE_REQUEST_HEADER_NAME should be lowercased', () => {
    const ci = ConfigIngestor({
      ...requiredVars,
      CLAIMSERVICE_API_ENDPOINT: 'dummy',
      TRACE_REQUEST_HEADER_NAME: 'X-This-Should-Be-LowercaseD',
    });
    expect(ci.TRACE_REQUEST_HEADER_NAME).to.equal('x-this-should-be-lowercased');
  });

  it('HTTP_TIMEOUT should throw a TypeError if not an integer', () => {
    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        HTTP_TIMEOUT: 'word',
      });
    }).to.throw(TypeError, /^HTTP_TIMEOUT must be a positive integer. Given word$/);
  });

  it('GOOGLE_TAG_MANAGER_ID should be parsed', () => {
    const ci = ConfigIngestor({
      ...requiredVars,
      GOOGLE_TAG_MANAGER_ID: 'GTM-XXXX',
    });
    expect(ci.GOOGLE_TAG_MANAGER_ID).to.be.a('string');
    expect(ci.GOOGLE_TAG_MANAGER_ID).to.equal('GTM-XXXX');
  });

  it('GOOGLE_TAG_MANAGER_ID must be valid format', () => {
    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        GOOGLE_TAG_MANAGER_ID: 'test',
      });
    }).to.throw(TypeError, /^GOOGLE_TAG_MANAGER_ID must be valid format$/);
  });

  it('ENABLE_CSP should be false if false', () => {
    const ci = ConfigIngestor({
      ...requiredVars,
      ENABLE_CSP: 'false',
    });
    expect(ci.ENABLE_CSP).to.equal(false);
  });

  it('ENABLE_CSP should be false if not true', () => {
    const ci = ConfigIngestor({
      ...requiredVars,
      ENABLE_CSP: 'test',
    });
    expect(ci.ENABLE_CSP).to.equal(false);
  });

  it('ENABLE_CSP should be true if true', () => {
    const ci = ConfigIngestor({
      ...requiredVars,
      ENABLE_CSP: 'true',
    });
    expect(ci.ENABLE_CSP).to.equal(true);
  });

  it('SESSION_TTL should throw a RangeError if < 30 seconds or > 1 hour', () => {
    expect(() => ConfigIngestor({
      ...requiredVars,
      SESSION_TTL: 29,
    })).to.throw(RangeError, 'SESSION_TTL must be within the range 30 to 3600 seconds');


    expect(() => ConfigIngestor({
      ...requiredVars,
      SESSION_TTL: 3601,
    })).to.throw(RangeError, 'SESSION_TTL must be within the range 30 to 3600 seconds');
  });

  it('SESSION_TTL should default to 1800 seconds', () => {
    const ci = ConfigIngestor({
      ...requiredVars,
    });

    expect(ci.SESSION_TTL).to.equal(1800);
  });

  it('SESSION_TTL should be an integer', () => {
    const ci = ConfigIngestor({
      ...requiredVars,
      SESSION_TTL: '30',
    });

    expect(ci.SESSION_TTL).to.equal(30);
  });

  it('CONTEXT_PATH should throw a SyntaxError if it does not have leading/trailig slashes', () => {
    expect(() => ConfigIngestor({
      ...requiredVars,
      CONTEXT_PATH: 'cp',
    })).to.throw(SyntaxError, 'CONTEXT_PATH must have a leading and trailing slash');

    expect(() => ConfigIngestor({
      ...requiredVars,
      CONTEXT_PATH: 'cp/',
    })).to.throw(SyntaxError, 'CONTEXT_PATH must have a leading and trailing slash');

    expect(() => ConfigIngestor({
      ...requiredVars,
      CONTEXT_PATH: '/cp',
    })).to.throw(SyntaxError, 'CONTEXT_PATH must have a leading and trailing slash');

    expect(() => ConfigIngestor({
      ...requiredVars,
      CONTEXT_PATH: '/cp/',
    })).to.not.throw();
  });

  it('CONTEXT_PATH should default to /', () => {
    let config;

    config = ConfigIngestor({
      ...requiredVars,
      CONTEXT_PATH: '',
    });
    expect(config.CONTEXT_PATH).to.equal('/');

    config = ConfigIngestor({
      ...requiredVars,
      CONTEXT_PATH: false,
    });
    expect(config.CONTEXT_PATH).to.equal('/');
  });
});
