const { waypoints } = require('../../lib/constants.js');
const countryYouLiveInValidation = require('../field-validators/eligibility/country-you-live-in.js');
const claimedStatePensionValidation = require('../field-validators/eligibility/claimed-state-pension.js');
const childrenLivingWithYouValidation = require('../field-validators/eligibility/children-living-with-you.js');
const yourNationalityValidation = require('../field-validators/eligibility/your-nationality.js');
const dateOfBirthValidation = require('../field-validators/eligibility/date-of-birth.js');
const liveWithPartnerValidation = require('../field-validators/eligibility/live-with-partner.js');
const partnerAgreeValidation = require('../field-validators/eligibility/partner-agree.js');
const partnerHousingBenefitValidation = require('../field-validators/eligibility/partner-housing-benefit.js');
const startHook = require('../hooks/eligibility/start.js');
const withSkipLink = require('../hooks/common/with-skip-link.js');

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
  };

  pages[waypoints.CHILDREN_LIVING_WITH_YOU] = {
    view: 'pages/eligibility/children-living-with-you.njk',
    fieldValidators: childrenLivingWithYouValidation,
  };

  pages[waypoints.CLAIM_INCLUDES_CHILDREN] = {
    view: 'pages/eligibility/claim-includes-children.njk',
  };

  pages[waypoints.DO_NOT_LIVE_UK] = {
    view: 'pages/eligibility/do-not-live-uk.njk',
  };

  pages[waypoints.YOUR_NATIONALITY] = {
    view: 'pages/eligibility/your-nationality.njk',
    fieldValidators: yourNationalityValidation,
  };

  pages[waypoints.DATE_OF_BIRTH] = {
    view: 'pages/eligibility/date-of-birth.njk',
    fieldValidators: dateOfBirthValidation,
  };

  pages[waypoints.TOO_YOUNG_TO_CLAIM] = {
    view: 'pages/eligibility/too-young-to-claim.njk',
  };

  pages[waypoints.LIVE_WITH_PARTNER] = {
    view: 'pages/eligibility/live-with-partner.njk',
    fieldValidators: liveWithPartnerValidation,
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
  };

  return pages;
};
