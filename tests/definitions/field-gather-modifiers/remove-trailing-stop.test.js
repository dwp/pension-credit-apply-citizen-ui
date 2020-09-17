const { expect } = require('chai');
const removeTrailingStop = require('../../../definitions/field-gather-modifiers/remove-trailing-stop.js');

describe('Modifiers: removeTrailingStop', () => {
  it('should export a function', () => {
    expect(removeTrailingStop).to.be.a('function');
  });

  it('should strip last char in string if .', () => {
    const fieldValue = 'test.';
    expect(removeTrailingStop({ fieldValue })).to.deep.equal('test');
  });

  it('should not strip stop last char in string if not .', () => {
    const fieldValue = 'test';
    expect(removeTrailingStop({ fieldValue })).to.deep.equal(fieldValue);
  });
});
