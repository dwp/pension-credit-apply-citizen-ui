const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../../../lib/constants.js');
const assert = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/contact-details/delegated-authority-details.js');

const waypoint = WP.DELEGATED_AUTHORITY_DETAILS;

const corporateActingBody = {
  [WP.WHO_MADE_CLAIM]: {
    whoMadeClaim: 'corporateActingBody',
  },
};
const notCorporateActingBody = {
  [WP.WHO_MADE_CLAIM]: {
    whoMadeClaim: 'charity',
  },
};

describe('Validators: delegated-authority-details', () => {
  describe('field: contactName', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await assert.expectValidatorToFail(validators, 'contactName', 'required', null, {
        summary: 'delegated-authority-details:field.contactName.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await assert.expectValidatorToPass(validators, 'contactName', 'required', { contactName: 'Jo Bloggs' });
    });

    it('should fail "strlen" validator if string length > 500', async () => {
      const longString = Array(502).join('x');
      await assert.expectValidatorToFail(validators, 'contactName', 'strlen', { contactName: longString }, {
        summary: 'delegated-authority-details:field.contactName.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500', async () => {
      const longString = Array(501).join('x');
      await assert.expectValidatorToPass(validators, 'contactName', 'strlen', { contactName: longString });
    });
  });

  describe('field: contactNino', () => {
    it('should fail "required" validator if no value is provided', async () => {
      const context = new JourneyContext(notCorporateActingBody);
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'contactNino', 'required', context, {
        summary: 'delegated-authority-details:field.contactNino.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      const context = new JourneyContext({
        ...notCorporateActingBody,
        [waypoint]: { contactNino: 'a-contactNino' },
      });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'contactNino', 'required', context);
    });

    it('should fail "contactNino" validator if an invalid contactNino is provided', async () => {
      const context = new JourneyContext({
        ...notCorporateActingBody,
        [waypoint]: { contactNino: 'invalid-contactNino' },
      });
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'contactNino', 'nino', context, {
        summary: 'delegated-authority-details:field.contactNino.format',
      });
    });

    it('should pass "contactNino" validator if a valid contactNino is provided', async () => {
      const context = new JourneyContext({
        ...notCorporateActingBody,
        [waypoint]: { contactNino: 'RN001001A' },
      });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'contactNino', 'nino', context);
    });

    it('should ignore validation if whoMadeClaim is "corporateActingBody"', async () => {
      const context = new JourneyContext(corporateActingBody);
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'contactNino', 'required', context);
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'contactNino', 'nino', context);
    });
  });

  describe('field: contactID', () => {
    it('should fail "required" validator if no value is provided', async () => {
      const context = new JourneyContext(corporateActingBody);
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'contactID', 'required', context, {
        summary: 'delegated-authority-details:field.contactID.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      const context = new JourneyContext({
        ...corporateActingBody,
        [waypoint]: { contactID: '123' },
      });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'contactID', 'required', context);
    });

    it('should fail "strlen" validator if string length > 500', async () => {
      const context = new JourneyContext({
        ...corporateActingBody,
        [waypoint]: { contactID: Array(502).join('x') },
      });
      await assert.expectValidatorToFailWithJourney(validators, waypoint, 'contactID', 'strlen', context, {
        summary: 'delegated-authority-details:field.contactID.length',
      });
    });

    it('should pass "strlen" validator if string length <= 500', async () => {
      const context = new JourneyContext({
        ...corporateActingBody,
        [waypoint]: { contactID: Array(501).join('x') },
      });
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'contactID', 'strlen', context);
    });

    it('should ignore validation if whoMadeClaim is not "corporateActingBody"', async () => {
      const context = new JourneyContext(notCorporateActingBody);
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'contactID', 'required', context);
      await assert.expectValidatorToPassWithJourney(validators, waypoint, 'contactID', 'strlen', context);
    });
  });
});
