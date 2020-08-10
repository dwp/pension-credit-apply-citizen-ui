const { expect } = require('chai');
const deepTrimWhitespace = require('../../../definitions/field-gather-modifiers/deep-trim-white-space.js');

describe('Modifiers: deepTrimWhitespace', () => {
  it('should export a function', () => {
    expect(deepTrimWhitespace).to.be.a('function');
  });

  it('should trim spaces from string value', () => {
    const fieldValue = ' test ';
    expect(deepTrimWhitespace({ fieldValue })).to.equal('test');
  });

  it('should trim spaces from strings in array value', () => {
    const fieldValue = [' test ', ' test2 '];
    expect(deepTrimWhitespace({ fieldValue })).to.deep.equal(['test', 'test2']);
  });

  it('should trim spaces from strings in an object', () => {
    const fieldValue = { prop: ' test ', prop2: ' test2 ' };
    expect(deepTrimWhitespace({ fieldValue })).to.deep.equal({ prop: 'test', prop2: 'test2' });
  });

  it('should trim spaces from strings in deep nested array', () => {
    const fieldValue = [' test ', ' test2 ', [' test3 ', [' test4 ']]];
    expect(deepTrimWhitespace({ fieldValue })).to.deep.equal(['test', 'test2', ['test3', ['test4']]]);
  });

  it('should trim spaces from strings in a deeply nested object', () => {
    const fieldValue = { prop: ' test ', prop2: ' test2 ', prop3: { prop4: ' test 3 ', prop5: [' test '] } };
    expect(deepTrimWhitespace({ fieldValue })).to.deep.equal({ prop: 'test', prop2: 'test2', prop3: { prop4: 'test 3', prop5: ['test'] } });
  });

  it('should return non string values as is', () => {
    const number = 100;
    const boolean = false;
    const und = undefined;
    const nul = null;
    expect(deepTrimWhitespace({ fieldValue: number })).to.equal(number);
    expect(deepTrimWhitespace({ fieldValue: boolean })).to.equal(boolean);
    expect(deepTrimWhitespace({ fieldValue: und })).to.equal(und);
    expect(deepTrimWhitespace({ fieldValue: nul })).to.equal(nul);
  });
});
