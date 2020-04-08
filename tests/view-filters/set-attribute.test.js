const { expect } = require('chai');

const setAttribute = require('../../view-filters/set-attribute.js');

describe('View filter: setAttribute', () => {
  it('should set a new attribute on an object', () => {
    const obj = { a: 1, b: 2 };
    setAttribute(obj, 'c', 3);

    expect(obj).to.deep.equal({ a: 1, b: 2, c: 3 });
  });
});
