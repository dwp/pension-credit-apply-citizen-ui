const { expect } = require('chai');
const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../../lib/constants.js');
const hrt = require('../../../definitions/route-conditions/hrt.js');

describe('route-conditions/hrt', () => {
  const stubRoute = {};

  it('should be an object', () => {
    expect(hrt).to.be.a('object');
  });

  it('should have a hasPartner function', () => {
    expect(hrt).to.have.property('hasPartner').that.is.a('function');
  });

  it('should have a citizenNeedsHRT function', () => {
    expect(hrt).to.have.property('citizenNeedsHRT').that.is.a('function');
  });

  it('should have a partnerNeedsHRT function', () => {
    expect(hrt).to.have.property('partnerNeedsHRT').that.is.a('function');
  });

  it('should have a onlyCitizenNeedsHRT function', () => {
    expect(hrt).to.have.property('onlyCitizenNeedsHRT').that.is.a('function');
  });

  it('should have a onlyPartnerNeedsHRT function', () => {
    expect(hrt).to.have.property('onlyPartnerNeedsHRT').that.is.a('function');
  });

  it('should have a noHRTNeeded function', () => {
    expect(hrt).to.have.property('noHRTNeeded').that.is.a('function');
  });

  describe('hasPartner', () => {
    it('should return true if liveWithPartner is yes', () => {
      const context = new JourneyContext({
        [WP.LIVE_WITH_PARTNER]: {
          liveWithPartner: 'yes',
        },
      });

      return expect(hrt.hasPartner(context)).to.be.true;
    });

    it('should return false if liveWithPartner is not yes', () => {
      const context = new JourneyContext({
        [WP.LIVE_WITH_PARTNER]: {
          liveWithPartner: 'no',
        },
      });

      return expect(hrt.hasPartner(context)).to.be.false;
    });
  });

  describe('citizenNeedsHRT', () => {
    it('should return true if rightToReside is no', () => {
      const context = new JourneyContext({
        [WP.YOUR_NATIONALITY]: {
          rightToReside: 'no',
          lived2Years: 'yes',
        },
      });

      return expect(hrt.citizenNeedsHRT(stubRoute, context)).to.be.true;
    });

    it('should return true if lived2Years is no', () => {
      const context = new JourneyContext({
        [WP.YOUR_NATIONALITY]: {
          rightToReside: 'yes',
          lived2Years: 'no',
        },
      });

      return expect(hrt.citizenNeedsHRT(stubRoute, context)).to.be.true;
    });

    it('should return false if lived2Years and rightToReside are not no', () => {
      const context = new JourneyContext({
        [WP.YOUR_NATIONALITY]: {
          rightToReside: 'yes',
          lived2Years: 'yes',
        },
      });

      return expect(hrt.citizenNeedsHRT(stubRoute, context)).to.be.false;
    });
  });

  describe('partnerNeedsHRT', () => {
    it('should return true if livesWithPartner is yes and partnerRightToReside is no', () => {
      const context = new JourneyContext({
        [WP.LIVE_WITH_PARTNER]: {
          liveWithPartner: 'yes',
        },
        [WP.PARTNER_NATIONALITY]: {
          partnerRightToReside: 'no',
          partnerLived2Years: 'yes',
        },
      });

      return expect(hrt.partnerNeedsHRT(stubRoute, context)).to.be.true;
    });

    it('should return true if livesWithPartner is yes and partnerLived2Years is no', () => {
      const context = new JourneyContext({
        [WP.LIVE_WITH_PARTNER]: {
          liveWithPartner: 'yes',
        },
        [WP.PARTNER_NATIONALITY]: {
          partnerRightToReside: 'yes',
          partnerLived2Years: 'no',
        },
      });

      return expect(hrt.partnerNeedsHRT(stubRoute, context)).to.be.true;
    });

    it('should return false if livesWithPartner is yes and partnerLived2Years are not no', () => {
      const context = new JourneyContext({
        [WP.LIVE_WITH_PARTNER]: {
          liveWithPartner: 'yes',
        },
        [WP.PARTNER_NATIONALITY]: {
          partnerRightToReside: 'yes',
          partnerLived2Years: 'yes',
        },
      });

      return expect(hrt.partnerNeedsHRT(stubRoute, context)).to.be.false;
    });

    it('should return false if livesWithPartner is no', () => {
      const context = new JourneyContext({
        [WP.LIVE_WITH_PARTNER]: {
          liveWithPartner: 'no',
        },
        [WP.PARTNER_NATIONALITY]: {
          partnerRightToReside: 'no',
          partnerLived2Years: 'no',
        },
      });

      return expect(hrt.partnerNeedsHRT(stubRoute, context)).to.be.false;
    });
  });

  describe('onlyCitizenNeedsHRT', () => {
    it('should return true if citizenNeedsHRT() is true and hasPartner() is false', () => {
      const context = new JourneyContext({
        [WP.LIVE_WITH_PARTNER]: {
          liveWithPartner: 'no',
        },
        [WP.YOUR_NATIONALITY]: {
          rightToReside: 'no',
          lived2Years: 'yes',
        },
      });

      return expect(hrt.onlyCitizenNeedsHRT(stubRoute, context)).to.be.true;
    });

    it('should return true if citizenNeedsHRT() is true and partnerNeedsHRT() is false', () => {
      const context = new JourneyContext({
        [WP.LIVE_WITH_PARTNER]: {
          liveWithPartner: 'yes',
        },
        [WP.YOUR_NATIONALITY]: {
          rightToReside: 'no',
          lived2Years: 'yes',
        },
        [WP.PARTNER_NATIONALITY]: {
          partnerRightToReside: 'yes',
          partnerLived2Years: 'yes',
        },
      });

      return expect(hrt.onlyCitizenNeedsHRT(stubRoute, context)).to.be.true;
    });

    it('should return false if citizenNeedsHRT() is true but both hasPartner() and partnerNeedsHRT() are true', () => {
      const context = new JourneyContext({
        [WP.LIVE_WITH_PARTNER]: {
          liveWithPartner: 'yes',
        },
        [WP.YOUR_NATIONALITY]: {
          rightToReside: 'no',
          lived2Years: 'yes',
        },
        [WP.PARTNER_NATIONALITY]: {
          partnerRightToReside: 'no',
          partnerLived2Years: 'yes',
        },
      });

      return expect(hrt.onlyCitizenNeedsHRT(stubRoute, context)).to.be.false;
    });

    it('should return false if citizenNeedsHRT() is false', () => {
      const context = new JourneyContext({
        [WP.YOUR_NATIONALITY]: {
          rightToReside: 'yes',
          lived2Years: 'yes',
        },
      });

      return expect(hrt.onlyCitizenNeedsHRT(stubRoute, context)).to.be.false;
    });
  });

  describe('onlyPartnerNeedsHRT', () => {
    it('should return true if citizenNeedsHRT() is false and both hasPartner() and partnerNeedsHRT() are true', () => {
      const context = new JourneyContext({
        [WP.LIVE_WITH_PARTNER]: {
          liveWithPartner: 'yes',
        },
        [WP.YOUR_NATIONALITY]: {
          rightToReside: 'yes',
          lived2Years: 'yes',
        },
        [WP.PARTNER_NATIONALITY]: {
          partnerRightToReside: 'no',
          partnerLived2Years: 'yes',
        },
      });

      return expect(hrt.onlyPartnerNeedsHRT(stubRoute, context)).to.be.true;
    });

    it('should return false if citizenNeedsHRT() is false, hasPartner() is true and partnerNeedsHRT() is false', () => {
      const context = new JourneyContext({
        [WP.LIVE_WITH_PARTNER]: {
          liveWithPartner: 'yes',
        },
        [WP.YOUR_NATIONALITY]: {
          rightToReside: 'yes',
          lived2Years: 'yes',
        },
        [WP.PARTNER_NATIONALITY]: {
          partnerRightToReside: 'yes',
          partnerLived2Years: 'yes',
        },
      });

      return expect(hrt.onlyPartnerNeedsHRT(stubRoute, context)).to.be.false;
    });

    it('should return false if citizenNeedsHRT() is false, hasPartner() is false and partnerNeedsHRT() is true', () => {
      const context = new JourneyContext({
        [WP.LIVE_WITH_PARTNER]: {
          liveWithPartner: 'no',
        },
        [WP.YOUR_NATIONALITY]: {
          rightToReside: 'yes',
          lived2Years: 'yes',
        },
        [WP.PARTNER_NATIONALITY]: {
          partnerRightToReside: 'no',
          partnerLived2Years: 'yes',
        },
      });

      return expect(hrt.onlyPartnerNeedsHRT(stubRoute, context)).to.be.false;
    });

    it('should return false if citizenNeedsHRT(), hasPartner() and partnerNeedsHRT() are all true', () => {
      const context = new JourneyContext({
        [WP.LIVE_WITH_PARTNER]: {
          liveWithPartner: 'yes',
        },
        [WP.YOUR_NATIONALITY]: {
          rightToReside: 'no',
          lived2Years: 'yes',
        },
        [WP.PARTNER_NATIONALITY]: {
          partnerRightToReside: 'no',
          partnerLived2Years: 'yes',
        },
      });

      return expect(hrt.onlyPartnerNeedsHRT(stubRoute, context)).to.be.false;
    });
  });

  describe('noHRTNeeded', () => {
    it('should return true if both citizenNeedsHRT() and partnerNeedsHRT() are false', () => {
      const context = new JourneyContext({
        [WP.LIVE_WITH_PARTNER]: {
          liveWithPartner: 'yes',
        },
        [WP.YOUR_NATIONALITY]: {
          rightToReside: 'yes',
          lived2Years: 'yes',
        },
        [WP.PARTNER_NATIONALITY]: {
          partnerRightToReside: 'yes',
          partnerLived2Years: 'yes',
        },
      });

      return expect(hrt.noHRTNeeded(stubRoute, context)).to.be.true;
    });

    it('should return false if both citizenNeedsHRT() is true and partnerNeedsHRT() is false', () => {
      const context = new JourneyContext({
        [WP.LIVE_WITH_PARTNER]: {
          liveWithPartner: 'yes',
        },
        [WP.YOUR_NATIONALITY]: {
          rightToReside: 'yes',
          lived2Years: 'no',
        },
        [WP.PARTNER_NATIONALITY]: {
          partnerRightToReside: 'yes',
          partnerLived2Years: 'yes',
        },
      });

      return expect(hrt.noHRTNeeded(stubRoute, context)).to.be.false;
    });

    it('should return false if both citizenNeedsHRT() is false and partnerNeedsHRT() is true', () => {
      const context = new JourneyContext({
        [WP.LIVE_WITH_PARTNER]: {
          liveWithPartner: 'yes',
        },
        [WP.YOUR_NATIONALITY]: {
          rightToReside: 'yes',
          lived2Years: 'yes',
        },
        [WP.PARTNER_NATIONALITY]: {
          partnerRightToReside: 'no',
          partnerLived2Years: 'yes',
        },
      });

      return expect(hrt.noHRTNeeded(stubRoute, context)).to.be.false;
    });
  });
});
