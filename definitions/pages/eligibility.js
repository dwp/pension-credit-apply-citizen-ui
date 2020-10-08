const { waypoints } = require('../../lib/constants.js');
const deepTrimWhitespace = require('../field-gather-modifiers/deep-trim-white-space.js');
const countryYouLiveInValidation = require('../field-validators/eligibility/country-you-live-in.js');
const claimedStatePensionValidation = require('../field-validators/eligibility/claimed-state-pension.js');
const childrenLivingWithYouValidation = require('../field-validators/eligibility/children-living-with-you.js');
const dateOfBirthValidation = require('../field-validators/eligibility/date-of-birth.js');
const abroadValidation = require('../field-validators/eligibility/abroad.js');
const periodsAbroadValidation = require('../field-validators/eligibility/periods-abroad.js');
const abroadMedicalValidation = require('../field-validators/eligibility/abroad-medical.js');
const datesAbroadValidation = require('../field-validators/eligibility/dates-abroad.js');
const offeredClaimDateValidation = require('../field-validators/eligibility/offered-claim-date.js');
const differentClaimDateValidation = require('../field-validators/eligibility/different-claim-date.js');
const liveWithPartnerValidation = require('../field-validators/eligibility/live-with-partner.js');
const partnerAgreeValidation = require('../field-validators/eligibility/partner-agree.js');
const partnerHousingBenefitValidation = require('../field-validators/eligibility/partner-housing-benefit.js');
const startHook = require('../hooks/eligibility/start.js');
const offeredClaimDateHook = require('../hooks/eligibility/offered-claim-date.js');
const earliestEntitlementDate = require('../hooks/common/earliest-entitlement-date.js');
const withSkipLink = require('../hooks/common/with-skip-link.js');
const withDataFromPage = require('../hooks/common/with-data-from-page.js');
const northernIrelandClaim = require('../hooks/common/northern-ireland-claim.js');

module.exports = (sessionTtl) => {
  const pages = Object.create(null);

  pages[waypoints.START] = {
    view: 'pages/start.njk',
    hooks: {
      prerender: [
        withSkipLink(waypoints.COUNTRY_YOU_LIVE_IN),
        startHook(sessionTtl),
      ],
    },
  };

  pages[waypoints.COUNTRY_YOU_LIVE_IN] = {
    view: 'pages/eligibility/country-you-live-in.njk',
    fieldValidators: countryYouLiveInValidation,
  };

  pages[waypoints.CLAIMED_STATE_PENSION] = {
    view: 'pages/eligibility/claimed-state-pension.njk',
    fieldValidators: claimedStatePensionValidation,
  };

  pages[waypoints.STATE_PENSION_NOT_CLAIMED] = {
    view: 'pages/eligibility/state-pension-not-claimed.njk',
    hooks: {
      prerender: northernIrelandClaim(waypoints),
    },
  };

  pages[waypoints.CHILDREN_LIVING_WITH_YOU] = {
    view: 'pages/eligibility/children-living-with-you.njk',
    fieldValidators: childrenLivingWithYouValidation,
  };

  pages[waypoints.CLAIM_INCLUDES_CHILDREN] = {
    view: 'pages/eligibility/claim-includes-children.njk',
    hooks: {
      prerender: northernIrelandClaim(waypoints),
    },
  };

  pages[waypoints.DO_NOT_LIVE_UK] = {
    view: 'pages/eligibility/do-not-live-uk.njk',
  };

  pages[waypoints.DATE_OF_BIRTH] = {
    view: 'pages/eligibility/date-of-birth.njk',
    fieldValidators: dateOfBirthValidation,
    fieldGatherModifiers: {
      dateOfBirth: deepTrimWhitespace,
    },
  };

  pages[waypoints.TOO_YOUNG_TO_CLAIM] = {
    view: 'pages/eligibility/too-young-to-claim.njk',
    hooks: {
      prerender: northernIrelandClaim(waypoints),
    },
  };

  pages[waypoints.ABROAD] = {
    view: 'pages/eligibility/abroad.njk',
    fieldValidators: abroadValidation,
    hooks: {
      prerender: earliestEntitlementDate,
    },
  };

  pages[waypoints.PERIODS_ABROAD] = {
    view: 'pages/eligibility/periods-abroad.njk',
    fieldValidators: periodsAbroadValidation,
    hooks: {
      prerender: earliestEntitlementDate,
    },
  };

  pages[waypoints.DATES_ABROAD] = {
    view: 'pages/eligibility/dates-abroad.njk',
    fieldValidators: datesAbroadValidation,
  };

  pages[waypoints.ABROAD_MEDICAL] = {
    view: 'pages/eligibility/abroad-medical.njk',
    fieldValidators: abroadMedicalValidation,
    hooks: {
      prerender: withDataFromPage({
        [waypoints.PERIODS_ABROAD]: ['periodsAbroad'],
      }),
    },
  };

  pages[waypoints.ADVANCE_CLAIM_DATE] = {
    view: 'pages/eligibility/advance-claim-date.njk',
    hooks: {
      prerender: [
        earliestEntitlementDate,
        withSkipLink(waypoints.LIVE_WITH_PARTNER),
      ],
    },
  };

  pages[waypoints.OFFERED_CLAIM_DATE] = {
    view: 'pages/eligibility/offered-claim-date.njk',
    fieldValidators: offeredClaimDateValidation,
    hooks: {
      prerender: offeredClaimDateHook,
    },
  };

  pages[waypoints.DIFFERENT_CLAIM_DATE] = {
    view: 'pages/eligibility/different-claim-date.njk',
    fieldValidators: differentClaimDateValidation,
    fieldGatherModifiers: {
      differentClaimDate: deepTrimWhitespace,
    },
  };

  pages[waypoints.LIVE_WITH_PARTNER] = {
    view: 'pages/eligibility/live-with-partner.njk',
    fieldValidators: liveWithPartnerValidation,
    fieldGatherModifiers: {
      partnerDateOfBirth: deepTrimWhitespace,
    },
  };

  pages[waypoints.PARTNER_AGREE] = {
    view: 'pages/eligibility/partner-agree.njk',
    fieldValidators: partnerAgreeValidation,
  };

  pages[waypoints.PARTNER_HOUSING_BENEFIT] = {
    view: 'pages/eligibility/partner-housing-benefit.njk',
    fieldValidators: partnerHousingBenefitValidation,
  };

  pages[waypoints.DONE_PARTNER] = {
    view: 'pages/eligibility/done-partner.njk',
    hooks: {
      prerender: northernIrelandClaim(waypoints),
    },
  };

  return pages;
};
