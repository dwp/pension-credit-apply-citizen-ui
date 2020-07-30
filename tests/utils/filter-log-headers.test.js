const { expect } = require('chai');

const filterLogHeaders = require('../../utils/filter-log-headers.js');

describe('Utils: filter-log-headers', () => {
  it('should return an object', () => {
    const headers = {};

    const filteredHeaders = filterLogHeaders(headers);
    expect(filteredHeaders).to.be.an('object');
  });

  it('should include only the headers from the allowlist', () => {
    const allowlist = ['test-1', 'test-2'];

    const headers = {
      'test-1': 'a',
      'test-2': 'a',
      'test-3': 'a',
    };

    const filteredHeaders = filterLogHeaders(headers, allowlist);

    expect(filteredHeaders).to.have.all.keys(
      'test-1',
      'test-2',
    );
  });

  it('should not include any headers that are not in the allowlist', () => {
    const allowlist = ['test-1', 'test-2'];

    const headers = {
      'test-1': 'a',
      'test-2': 'a',
      'test-3': 'a',
    };

    const filteredHeaders = filterLogHeaders(headers, allowlist);

    expect(filteredHeaders).not.to.have.property('test-3');
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

  it('should throw a TypeError if allowlist is not an array', () => {
    expect(() => filterLogHeaders({}, false)).to.throw(TypeError, 'allowlist must be an array');
    expect(() => filterLogHeaders({}, () => {})).to.throw(TypeError, 'allowlist must be an array');
    expect(() => filterLogHeaders({}, '')).to.throw(TypeError, 'allowlist must be an array');
    expect(() => filterLogHeaders({}, new Set())).to.throw(TypeError, 'allowlist must be an array');
    expect(() => filterLogHeaders({}, 123)).to.throw(TypeError, 'allowlist must be an array');
    expect(() => filterLogHeaders({}, [])).to.not.throw();
  });

  it('should sanitise invalid characters from each header', () => {
    const headers = {
      'test-1': '<>\\{}!@£$&*^',
    };

    const filteredHeaders = filterLogHeaders(headers, ['test-1']);

    expect(filteredHeaders).to.have.property('test-1').that.equals('');
  });

  it('should clip length of each header', () => {
    const headers = {
      'test-header': 'A'.repeat(500),
    };

    const filteredHeaders = filterLogHeaders(headers, ['test-header']);

    expect(filteredHeaders).to.have.property('test-header').that.has.length(256);
  });
});
