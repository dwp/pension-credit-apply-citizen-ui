const { expect } = require('chai');
const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../lib/constants.js');
const rentOrMortgage = require('../../utils/rent-or-mortgage.js');

describe('Utils: rent-or-mortgage', () => {
  it('should export a function', () => {
    expect(rentOrMortgage).to.be.a('function');
  });

  it('should return Mortgage if homeOwnership is "own"', () => {
    const journeyContext = new JourneyContext({ [WP.HOME_OWNERSHIP]: { homeOwnership: 'own' } });
    expect(rentOrMortgage(journeyContext)).to.equal('Mortgage');
  });

  it('should return Rent if homeOwnership is "rent"', () => {
    const journeyContext = new JourneyContext({ [WP.HOME_OWNERSHIP]: { homeOwnership: 'rent' } });
    expect(rentOrMortgage(journeyContext)).to.equal('Rent');
  });

  it('should return Either if homeOwnership is not "rent" or "own"', () => {
    const journeyContext = new JourneyContext({ [WP.HOME_OWNERSHIP]: { homeOwnership: 'other' } });
    expect(rentOrMortgage(journeyContext)).to.equal('Either');
  });
});
