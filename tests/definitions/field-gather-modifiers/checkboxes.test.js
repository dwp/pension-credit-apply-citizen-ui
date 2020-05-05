const { expect } = require('chai');
const checkboxes = require('../../../definitions/field-gather-modifiers/checkboxes.js');

describe('Modifiers: checkboxes', () => {
  it('should export a function', () => {
    expect(checkboxes).to.be.a('function');
  });

  it('should return array if given array', () => {
    const fieldValue = ['1', '2'];
    expect(checkboxes({ fieldValue })).to.deep.equal(fieldValue);
  });

  it('should return undefined if not array', () => {
    const fieldValue = { a: '1', b: '2', c: {} };
    expect(checkboxes({ fieldValue })).to.equal(undefined);
    expect(checkboxes({ fieldValue: '1' })).to.equal(undefined);
    expect(checkboxes({ fieldValue: true })).to.equal(undefined);
    expect(checkboxes({ fieldValue: 12 })).to.equal(undefined);
    expect(checkboxes({ fieldValue: undefined })).to.equal(undefined);
    expect(checkboxes({ fieldValue: null })).to.equal(undefined);
  });
});
