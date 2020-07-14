const { whoMadeClaim: WMC, userTypes: UT } = require('../lib/constants.js');

// Determine the type of user, DelegatedAuthority, Helper, or Claimant.
// This is needed to show the user 1 of 3 different groups of contextual content
const daSuffix = (whoMadeClaim) => {
  if (whoMadeClaim === WMC.CHARITY
    || whoMadeClaim === WMC.FRIEND_OR_FAMILY
    || whoMadeClaim === WMC.SOMEONE_ELSE
  ) {
    return UT.HELPER;
  }

  if (whoMadeClaim === WMC.POWER_OF_ATTORNEY
      || whoMadeClaim === WMC.APPOINTEE
      || whoMadeClaim === WMC.PERSONAL_ACTING_BODY
      || whoMadeClaim === WMC.CORPORATE_ACTING_BODY
  ) {
    return UT.DELEGATED_AUTHORITY;
  }

  return UT.CLAIMANT;
};

module.exports = daSuffix;
