const { expect } = require('chai');
const stripSpaces = require('../../utils/strip-spaces.js');

describe('Utils: strip-spaces', () => {
  it('should export a function', () => {
    expect(stripSpaces).to.be.a('function');
  });

  it('should strip spaces from a string', () => {
    expect(stripSpaces(' A A A A A ')).to.equal('AAAAA');
  });
});
