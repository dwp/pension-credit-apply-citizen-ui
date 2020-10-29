module.exports = {
  CONSENT_COOKIE_NAME: 'seen_cookie_message',

  userTypes: {
    DELEGATED_AUTHORITY: 'DelegatedAuthority',
    HELPER: 'Helper',
    CLAIMANT: 'Claimant',
  },

  whoMadeClaim: {
    CLAIMANT: 'claimant',
    POWER_OF_ATTORNEY: 'powerOfAttorney',
    APPOINTEE: 'appointee',
    PERSONAL_ACTING_BODY: 'personalActingBody',
    CORPORATE_ACTING_BODY: 'corporateActingBody',
    CHARITY: 'charity',
    FRIEND_OR_FAMILY: 'friendOrFamily',
    SOMEONE_ELSE: 'someoneElse',
  },

  waypoints: {
    START: 'start',
    COUNTRY_YOU_LIVE_IN: 'country-you-live-in',
    DO_NOT_LIVE_UK: 'do-not-live-uk',
    CLAIMED_STATE_PENSION: 'claimed-state-pension',
    STATE_PENSION_NOT_CLAIMED: 'state-pension-not-claimed',
    CHILDREN_LIVING_WITH_YOU: 'children-living-with-you',
    CLAIM_INCLUDES_CHILDREN: 'claim-includes-children-living-with-you',
    DATE_OF_BIRTH: 'date-of-birth',
    TOO_YOUNG_TO_CLAIM: 'too-young-to-claim',

    // Date of claim
    ADVANCE_CLAIM_DATE: 'advance-claim-date',
    OFFERED_CLAIM_DATE: 'offered-claim-date',
    DIFFERENT_CLAIM_DATE: 'different-claim-date',
    ABROAD: 'abroad',
    PERIODS_ABROAD: 'periods-abroad',
    ABROAD_MEDICAL: 'abroad-medical',
    DATES_ABROAD: 'dates-abroad',

    LIVE_WITH_PARTNER: 'live-with-partner',
    PARTNER_HOUSING_BENEFIT: 'partner-housing-benefit',
    PARTNER_AGREE: 'partner-agree',
    DONE_PARTNER: 'done-partner',
    NATIONAL_INSURANCE: 'national-insurance',
    YOUR_NAME: 'your-name',
    PHONE_NUMBER: 'phone-number',
    CLAIMANT_LANGUAGE: 'claimant-language',
    REGISTERED_BLIND: 'registered-blind',
    HELP_LETTERS_CALLS: 'help-letters-calls',
    CONTACT_FORMATS: 'contact-formats',
    PARTNER_NI_NUMBER: 'partner-national-insurance',
    PARTNER_NAME: 'partner-name',
    PARTNER_BLIND: 'partner-registered-blind',
    PARTNER_NATIONALITY: 'partner-nationality',
    CARE_HOME: 'care-home',
    POSTCODE_LOOKUP: 'postcode-lookup',

    WHERE_YOU_LIVE_ADDRESS_POSTCODE_LOOKUP: 'postcode-lookup',
    WHERE_YOU_LIVE_ADDRESS_MANUAL: 'address-manual',
    WHERE_YOU_LIVE_ADDRESS_SELECT: 'address-choice',
    WHERE_YOU_LIVE_ADDRESS_HIDDEN: '__home_address__',

    LIVES_WITH_YOU: 'lives-with-you',
    RENT_COUNCIL_TAX_RATES: 'rent-council-tax-rates',
    HOME_OWNERSHIP: 'home-ownership',
    SERVICE_CHARGES: 'service-charges',
    GROUND_RENT: 'ground-rent',
    HOUSING_BENEFIT: 'housing-benefit',
    TWENTY_ONE_YEAR_LEASE: '21-year-lease',
    HOME_LOAN: 'home-loan',
    SHARE_RENT_MORTGAGE: 'share-rent-mortgage',

    UNIVERSAL_CREDIT: 'universal-credit',
    BENEFITS: 'benefits',
    EARNINGS: 'earnings',
    OTHER_INCOME: 'other-income',

    MONEY_YOU_HAVE: 'money-you-have',
    SECOND_PROPERTY: 'second-property',
    BONDS: 'bonds',
    DISREGARDED_MONEY: 'disregarded-money',

    YOUR_NATIONALITY: 'your-nationality',
    HRT_CITIZEN_RETURNED_TO_UK: 'returned-to-uk',
    HRT_CITIZEN_NATIONALITY_DETAILS: 'nationality-details',
    HRT_CITIZEN_UK_SPONSORSHIP: 'uk-sponsorship',
    HRT_CITIZEN_SPONSORSHIP_DETAILS: 'sponsorship-details',
    HRT_CITIZEN_SPONSOR_ADDRESS_POSTCODE_LOOKUP: 'sponsor-address-postcode-lookup',
    HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL: 'sponsor-address-manual',
    HRT_CITIZEN_SPONSOR_ADDRESS_SELECT: 'sponsor-address-select',
    HRT_CITIZEN_ASYLUM_SEEKER: 'asylum-seeker',
    HRT_CITIZEN_ASYLUM_APPLICATION: 'asylum-application',
    HRT_CITIZEN_SPONSOR_ADDRESS_HIDDEN: '__sponsor-address__',

    HRT_PARTNER_RETURNED_TO_UK: 'partner-returned-to-uk',
    HRT_PARTNER_NATIONALITY_DETAILS: 'partner-nationality-details',
    HRT_PARTNER_UK_SPONSORSHIP: 'partner-uk-sponsorship',
    HRT_PARTNER_SPONSORSHIP_DETAILS: 'partner-sponsorship-details',
    HRT_PARTNER_SPONSOR_ADDRESS_POSTCODE_LOOKUP: 'partner-sponsor-address-postcode-lookup',
    HRT_PARTNER_SPONSOR_ADDRESS_MANUAL: 'partner-sponsor-address-manual',
    HRT_PARTNER_SPONSOR_ADDRESS_SELECT: 'partner-sponsor-address-select',
    HRT_PARTNER_ASYLUM_SEEKER: 'partner-asylum-seeker',
    HRT_PARTNER_ASYLUM_APPLICATION: 'partner-asylum-application',
    HRT_PARTNER_SPONSOR_ADDRESS_HIDDEN: '__partner-sponsor-address__',

    // Delegated authority
    WHO_MADE_CLAIM: 'who-made-claim',
    CAN_WE_CALL: 'can-we-call',
    DELEGATED_AUTHORITY_DETAILS: 'delegated-authority-details',
    LANGUAGE: 'language',
    DIFFERENT_FORMATS: 'different-formats',
    LETTERS_ADDRESS: 'letter-address',

    LETTERS_ADDRESS_POSTCODE_LOOKUP: 'letter-postcode',
    LETTERS_ADDRESS_MANUAL: 'manual-letter-address',
    LETTERS_ADDRESS_SELECT: 'select-letter-address',
    LETTERS_ADDRESS_HIDDEN: '__letters_address__',

    // Journey end
    CHECK_YOUR_ANSWERS: 'check-your-answers',
    WHAT_HAPPENS_NEXT: 'what-happens-next',

    ACCESSIBILITY_STATEMENT: 'accessibility-statement',

    // Cookies
    COOKIE_POLICY: 'cookie-policy',
    COOKIE_DETAILS: 'cookie-details',
    COOKIE_CONSENT: 'cookie-consent',

    // Session
    SESSION_KEEP_ALIVE: 'session-keep-alive',
    SESSION_ENDED: 'session-ended',
  },

  origins: {
    APPLY: 'apply-for-pension-credit',
  },
};
