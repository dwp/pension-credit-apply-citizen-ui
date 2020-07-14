const { expect } = require('chai');
const { whoMadeClaim: WMC, userTypes: UT } = require('../../lib/constants.js');
const daSuffix = require('../../utils/delegated-authority-suffix.js');

describe('Utils: delegated-authority-suffix', () => {
  it('should export a function', () => {
    expect(daSuffix).to.be.a('function');
  });

  it('should return "Helper" if input is "charity"', () => {
    expect(daSuffix(WMC.CHARITY)).to.equal(UT.HELPER);
  });

  it('should return "Helper" if input is "friendOrFamily"', () => {
    expect(daSuffix(WMC.FRIEND_OR_FAMILY)).to.equal(UT.HELPER);
  });

  it('should return "Helper" if input is "someoneElse"', () => {
    expect(daSuffix(WMC.SOMEONE_ELSE)).to.equal(UT.HELPER);
  });

  it('should return "DelegatedAuthority" if input is "powerOfAttorney"', () => {
    expect(daSuffix(WMC.POWER_OF_ATTORNEY)).to.equal(UT.DELEGATED_AUTHORITY);
  });

  it('should return "DelegatedAuthority" if input is "appointee"', () => {
    expect(daSuffix(WMC.APPOINTEE)).to.equal(UT.DELEGATED_AUTHORITY);
  });

  it('should return "DelegatedAuthority" if input is "personalActingBody"', () => {
    expect(daSuffix(WMC.PERSONAL_ACTING_BODY)).to.equal(UT.DELEGATED_AUTHORITY);
  });

  it('should return "DelegatedAuthority" if input is "corporateActingBody"', () => {
    expect(daSuffix(WMC.CORPORATE_ACTING_BODY)).to.equal(UT.DELEGATED_AUTHORITY);
  });

  it('should return "Claimant" if input is "claimant"', () => {
    expect(daSuffix(WMC.CLAIMANT)).to.equal(UT.CLAIMANT);
  });

  it('should return "Claimant" if input is anything else', () => {
    expect(daSuffix('other')).to.equal(UT.CLAIMANT);
  });
});
