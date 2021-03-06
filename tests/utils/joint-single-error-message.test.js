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

  it('should return a function that appends Joint to the input string if havePartner is "yesLiveTogether"', () => {
    const journeyContext = new JourneyContext({ [WP.LIVE_WITH_PARTNER]: { havePartner: 'yesLiveTogether' } });
    const test = jointSingleErrorMsg('errorMsg');
    expect(test({ journeyContext })).to.equal('errorMsgJoint');
  });

  it('should return a function that appends Single to the input string if havePartner is not "yesLiveApart"', () => {
    const journeyContext = new JourneyContext({ [WP.LIVE_WITH_PARTNER]: { havePartner: 'yesLiveApart' } });
    const test = jointSingleErrorMsg('errorMsg');
    expect(test({ journeyContext })).to.equal('errorMsgSingle');
  });

  it('should return a function that appends Single to the input string if havePartner is not "no"', () => {
    const journeyContext = new JourneyContext({ [WP.LIVE_WITH_PARTNER]: { havePartner: 'no' } });
    const test = jointSingleErrorMsg('errorMsg');
    expect(test({ journeyContext })).to.equal('errorMsgSingle');
  });
});
