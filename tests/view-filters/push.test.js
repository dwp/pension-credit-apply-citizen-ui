const { expect } = require('chai');

const push = require('../../view-filters/push.js');

describe('View filter: push', () => {
  it('should push a new intem into an array', () => {
    const arr = [1, 2];
    push(arr, 3);

    expect(arr).to.deep.equal([1, 2, 3]);
  });
});
