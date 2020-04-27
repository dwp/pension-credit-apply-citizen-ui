const { expect } = require('chai');
const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../lib/constants.js');
const jointSingleErrorMsg = require('../../utils/joint-single-error-message.js');

describe('Utils: joint-single-error-message', () => {
  it('should be a function', () => {
    expect(jointSingleErrorMsg).to.instanceOf(Function);
  });

  it('should return a function', () => {
    expect(jointSingleErrorMsg('')).to.instanceOf(Function);
  });

  it('should return a function that appends Joint to the input string if liveWithPartner is "yes"', () => {
    const journeyContext = new JourneyContext({ [WP.LIVE_WITH_PARTNER]: { liveWithPartner: 'yes' } });
    const test = jointSingleErrorMsg('errorMsg');
    expect(test({ journeyContext })).to.equal('errorMsgJoint');
  });

  it('should return a function that appends Single to the input string if liveWithPartner is not "yes"', () => {
    const journeyContext = new JourneyContext({ [WP.LIVE_WITH_PARTNER]: { liveWithPartner: 'no' } });
    const test = jointSingleErrorMsg('errorMsg');
    expect(test({ journeyContext })).to.equal('errorMsgSingle');
  });
});
