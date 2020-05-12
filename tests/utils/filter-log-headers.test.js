const { expect } = require('chai');

const Request = require('../helpers/fake-request.js');
const filterLogHeaders = require('../../utils/filter-log-headers.js');

describe('Utils: filter-log-headers', () => {
  const req = new Request({});

  it('should return an object', () => {
    req.headers = {
      host: 'test-host',
    };

    const filteredHeaders = filterLogHeaders(req.headers);
    expect(filteredHeaders).to.be.an('object');
  });

  it('should include all of the keys from the whitelist', () => {
    req.headers = {
      'x-forwarded-for': 'a',
      'x-forwarded-proto': 'a',
      'x-forwarded-port': 'a',
      'x-amzn-trace-id': 'a',
      'x-forwarded-host': 'a',
      'x-real-ip': 'a',
      'upgrade-insecure-requests': 'a',
      'sec-fetch-user': 'a',
      host: 'a',
      connection: 'a',
      'sec-fetch-mode': 'a',
      'if-none-match': 'a',
      'if-modified-since': 'a',
      'sec-fetch-site': 'a',
      referer: 'a',
      authorization: 'a',
      tokenpayload: 'a',
    };

    const filteredHeaders = filterLogHeaders(req.headers);

    expect(filteredHeaders).to.have.all.keys(
      'x-forwarded-proto',
      'x-forwarded-port',
      'x-amzn-trace-id',
      'x-forwarded-host',
      'upgrade-insecure-requests',
      'sec-fetch-user',
      'host',
      'connection',
      'sec-fetch-mode',
      'if-none-match',
      'if-modified-since',
      'sec-fetch-site',
      'referer',
    );
  });

  it('should not include any key that is no from the whitelist', () => {
    req.headers = {
      'x-forwarded-for': 'a',
      'x-forwarded-proto': 'a',
      'x-forwarded-port': 'a',
      'x-amzn-trace-id': 'a',
      'x-forwarded-host': 'a',
      'x-real-ip': 'a',
      'upgrade-insecure-requests': 'a',
      'sec-fetch-user': 'a',
      host: 'a',
      connection: 'a',
      'sec-fetch-mode': 'a',
      'if-none-match': 'a',
      'if-modified-since': 'a',
      'sec-fetch-site': 'a',
      referer: 'a',
      authorization: 'a',
      tokenpayload: 'a',
    };

    const filteredHeaders = filterLogHeaders(req.headers);

    expect(filteredHeaders).not.to.have.property('not-a-valid-key');
  });

  it('should throw a TypeError for a null entry type for req.headers', () => {
    expect(() => filterLogHeaders(null)).to.throw(TypeError, 'headers must be of type [object Object]');
  });

  it('should throw a TypeError for an array entry type for req.headers', () => {
    expect(() => filterLogHeaders([])).to.throw(TypeError, 'headers must be of type [object Object]');
  });

  it('should throw a TypeError for an undefined entry type for req.headers', () => {
    expect(() => filterLogHeaders(undefined)).to.throw(TypeError, 'headers must be of type [object Object]');
  });

  it('should throw a TypeError for an string entry type for req.headers', () => {
    expect(() => filterLogHeaders('random string')).to.throw(TypeError, 'headers must be of type [object Object]');
  });

  it('should throw a TypeError for a number entry type for req.headers', () => {
    expect(() => filterLogHeaders(12345)).to.throw(TypeError, 'headers must be of type [object Object]');
  });

  it('should sanitise invalid characters from each header', () => {
    req.headers = {
      'x-amzn-trace-id': '<>\\{}!@£$&*^',
    };

    const filteredHeaders = filterLogHeaders(req.headers);

    expect(filteredHeaders).to.have.property('x-amzn-trace-id').that.equals('............');
  });

  it('should clip length of each header', () => {
    req.headers = {
      'x-amzn-trace-id': 'A'.repeat(500),
    };

    const filteredHeaders = filterLogHeaders(req.headers);

    expect(filteredHeaders).to.have.property('x-amzn-trace-id').that.has.length(256);
  });
});
