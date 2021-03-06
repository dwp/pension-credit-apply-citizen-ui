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

  it('ConfigIngestor should throw if invalid REDIS_ENCRYPTION_MODE given', () => {
    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        REDIS_ENCRYPTION_MODE: 'invalid',
      });
    }).to.throw(SyntaxError, /^REDIS_ENCRYPTION_MODE must be one of <empty>, local or kms$/);
  });

  it('ConfigIngestor should throw if REDIS_ENCRYPTION_MODE == kms and REDIS_ENCRYPTION_ARN is missing', () => {
    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        REDIS_ENCRYPTION_MODE: 'kms',
      });
    }).to.throw(Error, /^REDIS_ENCRYPTION_ARN is required when using kms encryption$/);
  });

  it('ConfigIngestor should throw if REDIS_ENCRYPTION_MODE == kms and REDIS_ENCRYPTION_ARN is invalid format', () => {
    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        REDIS_ENCRYPTION_MODE: 'kms',
        REDIS_ENCRYPTION_ARN: 'badformat',
      });
    }).to.throw(SyntaxError, 'REDIS_ENCRYPTION_ARN must use full ARN format (arn:aws:kms:<region>:<accountid>:key/<uuid>)');
  });

  it('ConfigIngestor should throw if REDIS_ENCRYPTION_CACHE_TTL is invalid', () => {
    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        REDIS_ENCRYPTION_CACHE_TTL: 'string',
      });
    }).to.throw(TypeError, 'REDIS_ENCRYPTION_CACHE_TTL must be an integer');

    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        REDIS_ENCRYPTION_CACHE_TTL: -1,
      });
    }).to.throw(RangeError, 'REDIS_ENCRYPTION_CACHE_TTL must be between 0 and 1800');

    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        REDIS_ENCRYPTION_CACHE_TTL: 1801,
      });
    }).to.throw(RangeError, 'REDIS_ENCRYPTION_CACHE_TTL must be between 0 and 1800');
  });

  it('ConfigIngestor should throw if REDIS_ENCRYPTION_CACHE_CAPACITY is invalid', () => {
    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        REDIS_ENCRYPTION_CACHE_CAPACITY: 'string',
      });
    }).to.throw(TypeError, 'REDIS_ENCRYPTION_CACHE_CAPACITY must be an integer');

    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        REDIS_ENCRYPTION_CACHE_CAPACITY: -1,
      });
    }).to.throw(RangeError, 'REDIS_ENCRYPTION_CACHE_CAPACITY must be between 0 and 10000');

    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        REDIS_ENCRYPTION_CACHE_CAPACITY: 10001,
      });
    }).to.throw(RangeError, 'REDIS_ENCRYPTION_CACHE_CAPACITY must be between 0 and 10000');
  });

  it('ConfigIngestor should throw if REDIS_ENCRYPTION_CACHE_REUSE_LIMIT is invalid', () => {
    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        REDIS_ENCRYPTION_CACHE_REUSE_LIMIT: 'string',
      });
    }).to.throw(TypeError, 'REDIS_ENCRYPTION_CACHE_REUSE_LIMIT must be an integer');

    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        REDIS_ENCRYPTION_CACHE_REUSE_LIMIT: -1,
      });
    }).to.throw(RangeError, 'REDIS_ENCRYPTION_CACHE_REUSE_LIMIT must be between 0 and 10000');

    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        REDIS_ENCRYPTION_CACHE_REUSE_LIMIT: 10001,
      });
    }).to.throw(RangeError, 'REDIS_ENCRYPTION_CACHE_REUSE_LIMIT must be between 0 and 10000');
  });

  it('ConfigIngestor should throw if REDIS_ENCRYPTION_SUITE is not an integer', () => {
    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        REDIS_ENCRYPTION_SUITE: 'not a string',
      });
    }).to.throw(TypeError, 'REDIS_ENCRYPTION_SUITE must be an integer');
  });

  it('ConfigIngestor should throw if REDIS_ENCRYPTION_SUITE is not a valid AWS SDK suite ID', () => {
    // ref: https://github.com/aws/aws-encryption-sdk-javascript/blob/master/modules/material-management/src/algorithm_suites.ts#L24-L33
    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        REDIS_ENCRYPTION_SUITE: 1234,
      });
    }).to.throw(ReferenceError, 'REDIS_ENCRYPTION_SUITE must be a valid suite ID');
  });

  it('ConfigIngestor should set REDIS_ENCRYPTION_SUITE to undefined by default', () => {
    const config = ConfigIngestor(requiredVars);
    return expect(config.REDIS_ENCRYPTION_SUITE).to.be.undefined;
  });

  it('ConfigIngestor should set REDIS_ENCRYPTION_CONTEXT_TAG to undefined by default', () => {
    const config = ConfigIngestor(requiredVars);
    return expect(config.REDIS_ENCRYPTION_CONTEXT_TAG).to.be.undefined;
  });

  it('ConfigIngestor should set REDIS_ENCRYPTION_CONTEXT_TAG to specified value', () => {
    const config = ConfigIngestor({
      ...requiredVars,
      REDIS_ENCRYPTION_CONTEXT_TAG: 'test',
    });
    expect(config.REDIS_ENCRYPTION_CONTEXT_TAG).to.equal('test');
  });

  it('ConfigIngestor should throw if AWS_KMS_ENDPOINT is defined in a non-development environment', () => {
    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        AWS_KMS_ENDPOINT: 'http://localhost:4566',
        NODE_ENV: 'production',
      });
    }).to.throw(Error, /^AWS_KMS_ENDPOINT xannot be defined in non-development environments$/);
  });

  it('ConfigIngestor should throw if invalid LOG_LEVEL given', () => {
    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        CLAIMSERVICE_API_ENDPOINT: 'dummy',
        LOG_LEVEL: 'invalid-test',
      });
    }).to.throw(Error, /^LOG_LEVEL must be one of: fatal, error, warn, info, debug, trace, silent. Given invalid-test$/);
  });

  it('ConfigIngestor should throw if invalid LOG_HEADERS given', () => {
    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        CLAIMSERVICE_API_ENDPOINT: 'dummy',
        LOG_HEADERS: [],
      });
    }).to.throw(Error, /^LOG_HEADERS must be a comma-separated string$/);
  });

  it('LOG_HEADERS should be split into an array', () => {
    let c;

    c = ConfigIngestor({ ...requiredVars, CLAIMSERVICE_API_ENDPOINT: 'dummy' });
    expect(c).to.have.property('LOG_HEADERS').that.is.an.instanceof(Array);

    c = ConfigIngestor({ ...requiredVars, CLAIMSERVICE_API_ENDPOINT: 'dummy', LOG_HEADERS: '' });
    expect(c).to.have.property('LOG_HEADERS').that.is.an.instanceof(Array).and.deep.equals([]);

    c = ConfigIngestor({ ...requiredVars, CLAIMSERVICE_API_ENDPOINT: 'dummy', LOG_HEADERS: 'safe-header,header-2' });
    expect(c).to.have.property('LOG_HEADERS').that.is.an.instanceof(Array).and.deep.equals(['safe-header', 'header-2']);
  });

  it('LOG_HEADERS should lowercase values', () => {
    const c = ConfigIngestor({ ...requiredVars, CLAIMSERVICE_API_ENDPOINT: 'dummy', LOG_HEADERS: 'Test-1, tEsT-2' });
    expect(c).to.have.property('LOG_HEADERS').that.is.an.instanceof(Array).and.deep.equals(['test-1', 'test-2']);
  });

  it('LOG_HEADERS should sanitise values so they are valid http header format', () => {
    const c = ConfigIngestor({ ...requiredVars, CLAIMSERVICE_API_ENDPOINT: 'dummy', LOG_HEADERS: '^u!n£s/a\\f*e.$' });
    expect(c).to.have.property('LOG_HEADERS').that.is.an.instanceof(Array).and.deep.equals(['unsafe']);
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

  it('GOOGLE_TAG_MANAGER_DOMAIN should be parsed', () => {
    const ci = ConfigIngestor({
      ...requiredVars,
      GOOGLE_TAG_MANAGER_DOMAIN: '.test.gov.uk',
    });
    expect(ci.GOOGLE_TAG_MANAGER_DOMAIN).to.be.a('string');
    expect(ci.GOOGLE_TAG_MANAGER_DOMAIN).to.equal('.test.gov.uk');
  });

  it('GOOGLE_TAG_MANAGER_DOMAIN must be valid format', () => {
    expect(() => {
      ConfigIngestor({
        ...requiredVars,
        GOOGLE_TAG_MANAGER_DOMAIN: 'bad domain',
      });
    }).to.throw(TypeError, /^GOOGLE_TAG_MANAGER_DOMAIN must be valid format$/);
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

  it('SESSION_TTL should throw a RangeError if < 60 seconds or > 1 hour', () => {
    expect(() => ConfigIngestor({
      ...requiredVars,
      SESSION_TTL: 59,
    })).to.throw(RangeError, 'SESSION_TTL must be within the range 60 to 3600 seconds');


    expect(() => ConfigIngestor({
      ...requiredVars,
      SESSION_TTL: 3601,
    })).to.throw(RangeError, 'SESSION_TTL must be within the range 60 to 3600 seconds');
  });

  it('SESSION_TTL should throw an Error if not a factor of 60', () => {
    expect(() => ConfigIngestor({
      ...requiredVars,
      SESSION_TTL: 61,
    })).to.throw(Error, 'SESSION_TTL must be a factor of 60');
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
      SESSION_TTL: '3600',
    });

    expect(ci.SESSION_TTL).to.equal(3600);
  });

  it('SESSION_TTL restrictions ignored if DISABLE_SESSION_TTL_RESTRICTIONS is true', () => {
    const ci = ConfigIngestor({
      ...requiredVars,
      DISABLE_SESSION_TTL_RESTRICTIONS: 'true',
      SESSION_TTL: '3',
      TIMEOUT_DIALOG_COUNTDOWN: '2',
    });

    expect(ci.SESSION_TTL).to.equal(3);

    const ci2 = ConfigIngestor({
      ...requiredVars,
      DISABLE_SESSION_TTL_RESTRICTIONS: 'true',
      SESSION_TTL: '5000',
    });

    expect(ci2.SESSION_TTL).to.equal(5000);
  });

  it('TIMEOUT_DIALOG_COUNTDOWN should throw a RangeError if < 60 seconds or > 1 hour', () => {
    expect(() => ConfigIngestor({
      ...requiredVars,
      TIMEOUT_DIALOG_COUNTDOWN: 59,
    })).to.throw(RangeError, 'TIMEOUT_DIALOG_COUNTDOWN must be within the range 60 to 3600 seconds');

    expect(() => ConfigIngestor({
      ...requiredVars,
      TIMEOUT_DIALOG_COUNTDOWN: 3601,
    })).to.throw(RangeError, 'TIMEOUT_DIALOG_COUNTDOWN must be within the range 60 to 3600 seconds');
  });

  it('TIMEOUT_DIALOG_COUNTDOWN should throw an Error if not a factor of 60', () => {
    expect(() => ConfigIngestor({
      ...requiredVars,
      TIMEOUT_DIALOG_COUNTDOWN: 61,
    })).to.throw(Error, 'TIMEOUT_DIALOG_COUNTDOWN must be a factor of 60');
  });

  it('TIMEOUT_DIALOG_COUNTDOWN should throw an Error if not less than SESSION_TTL', () => {
    expect(() => ConfigIngestor({
      ...requiredVars,
      SESSION_TTL: 300,
      TIMEOUT_DIALOG_COUNTDOWN: 300,
    })).to.throw(Error, 'TIMEOUT_DIALOG_COUNTDOWN must be less than SESSION_TTL');

    expect(() => ConfigIngestor({
      ...requiredVars,
      SESSION_TTL: 300,
      TIMEOUT_DIALOG_COUNTDOWN: 360,
    })).to.throw(Error, 'TIMEOUT_DIALOG_COUNTDOWN must be less than SESSION_TTL');
  });

  it('TIMEOUT_DIALOG_COUNTDOWN should default to 5 minutes less than SESSION_TTL', () => {
    const ci = ConfigIngestor({
      ...requiredVars,
      SESSION_TTL: 1800,
    });

    expect(ci.TIMEOUT_DIALOG_COUNTDOWN).to.equal(1500);
  });

  it('TIMEOUT_DIALOG_COUNTDOWN should be an integer', () => {
    const ci = ConfigIngestor({
      ...requiredVars,
      TIMEOUT_DIALOG_COUNTDOWN: '60',
    });

    expect(ci.TIMEOUT_DIALOG_COUNTDOWN).to.equal(60);
  });

  it('TIMEOUT_DIALOG_COUNTDOWN restrictions ignored if DISABLE_SESSION_TTL_RESTRICTIONS is true', () => {
    const ci = ConfigIngestor({
      ...requiredVars,
      DISABLE_SESSION_TTL_RESTRICTIONS: 'true',
      TIMEOUT_DIALOG_COUNTDOWN: '3',
    });

    expect(ci.TIMEOUT_DIALOG_COUNTDOWN).to.equal(3);

    const ci2 = ConfigIngestor({
      ...requiredVars,
      DISABLE_SESSION_TTL_RESTRICTIONS: 'true',
      SESSION_TTL: '5001',
      TIMEOUT_DIALOG_COUNTDOWN: '5000',
    });

    expect(ci2.TIMEOUT_DIALOG_COUNTDOWN).to.equal(5000);
  });

  it('CONTEXT_PATH should throw a SyntaxError if it does not have leading/trailing slashes', () => {
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

  it('CONTEXT_PATH_PROXY should throw a SyntaxError if it does not have leading/trailing slashes', () => {
    expect(() => ConfigIngestor({
      ...requiredVars,
      CONTEXT_PATH_PROXY: 'cp',
    })).to.throw(SyntaxError, 'CONTEXT_PATH_PROXY must have a leading and trailing slash');

    expect(() => ConfigIngestor({
      ...requiredVars,
      CONTEXT_PATH_PROXY: 'cp/',
    })).to.throw(SyntaxError, 'CONTEXT_PATH_PROXY must have a leading and trailing slash');

    expect(() => ConfigIngestor({
      ...requiredVars,
      CONTEXT_PATH_PROXY: '/cp',
    })).to.throw(SyntaxError, 'CONTEXT_PATH_PROXY must have a leading and trailing slash');

    expect(() => ConfigIngestor({
      ...requiredVars,
      CONTEXT_PATH_PROXY: '/cp/',
    })).to.not.throw();
  });

  it('CONTEXT_PATH_PROXY should default to match CONTEXT_PATH', () => {
    let config;

    config = ConfigIngestor({
      ...requiredVars,
      CONTEXT_PATH_PROXY: '',
    });
    expect(config.CONTEXT_PATH_PROXY).to.equal('/');

    config = ConfigIngestor({
      ...requiredVars,
      CONTEXT_PATH_PROXY: false,
    });
    expect(config.CONTEXT_PATH_PROXY).to.equal('/');

    config = ConfigIngestor({
      ...requiredVars,
      CONTEXT_PATH: '/sample/',
    });
    expect(config.CONTEXT_PATH_PROXY).to.equal('/sample/');

    config = ConfigIngestor({
      ...requiredVars,
      CONTEXT_PATH: '/sample/',
      CONTEXT_PATH_PROXY: null,
    });
    expect(config.CONTEXT_PATH_PROXY).to.equal('/sample/');
  });
});
