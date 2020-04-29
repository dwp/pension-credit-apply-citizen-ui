const { expect } = require('chai');
const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/common/manual-address.js');

describe('Validators: manual-address', () => {
  describe('field: addressLine1', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'addressLine1', 'required', null, {
        summary: 'manual-address:field.addressLine1.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'addressLine1', 'required', { addressLine1: 'Valid Address' });
    });

    it('should fail "strlen" validator if string length > 100', async () => {
      const longString = Array(102).join('x');
      expect(longString).has.length(101);
      await expectValidatorToFail(validators, 'addressLine1', 'strlen', { addressLine1: longString }, {
        summary: 'manual-address:field.addressLine1.length',
      });
    });

    it('should pass "strlen" validator if string length <= 100', async () => {
      const longString = Array(101).join('x');
      expect(longString).has.length(100);
      await expectValidatorToPass(validators, 'addressLine1', 'strlen', { addressLine1: longString });
    });
  });

  describe('field: addressLine2', () => {
    it('should fail "strlen" validator if string length > 100', async () => {
      const longString = Array(102).join('x');
      expect(longString).has.length(101);
      await expectValidatorToFail(validators, 'addressLine2', 'strlen', { addressLine2: longString }, {
        summary: 'manual-address:field.addressLine2.length',
      });
    });

    it('should pass "strlen" validator if string length <= 100', async () => {
      const longString = Array(101).join('x');
      expect(longString).has.length(100);
      await expectValidatorToPass(validators, 'addressLine2', 'strlen', { addressLine2: longString });
    });
  });

  describe('field: town', () => {
    it('should fail "strlen" validator if string length > 100', async () => {
      const longString = Array(102).join('x');
      expect(longString).has.length(101);
      await expectValidatorToFail(validators, 'town', 'strlen', { town: longString }, {
        summary: 'manual-address:field.town.length',
      });
    });

    it('should pass "strlen" validator if string length <= 100', async () => {
      const longString = Array(101).join('x');
      expect(longString).has.length(100);
      await expectValidatorToPass(validators, 'town', 'strlen', { town: longString });
    });
  });

  describe('field: county', () => {
    it('should fail "strlen" validator if string length > 100', async () => {
      const longString = Array(102).join('x');
      expect(longString).has.length(101);
      await expectValidatorToFail(validators, 'county', 'strlen', { county: longString }, {
        summary: 'manual-address:field.county.length',
      });
    });

    it('should pass "strlen" validator if string length <= 100', async () => {
      const longString = Array(101).join('x');
      expect(longString).has.length(100);
      await expectValidatorToPass(validators, 'county', 'strlen', { county: longString });
    });
  });

  describe('field: postcode', () => {
    it('should fail "required" validator if no value is provided', async () => {
      await expectValidatorToFail(validators, 'postcode', 'required', null, {
        summary: 'manual-address:field.postcode.required',
      });
    });

    it('should pass "required" validator if a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'postcode', 'required', { postcode: 'Valid Address' });
    });

    it('should fail "isValidPostcode" validator if value is an invalid postcode', async () => {
      await expectValidatorToFail(validators, 'postcode', 'isValidPostcode', { postcode: '11X X11' }, {
        summary: 'postcode:field.postcode.format',
      });
    });

    it('should pass "isValidPostcode" validator if value is a valid postcode', async () => {
      await expectValidatorToPass(validators, 'postcode', 'isValidPostcode', { postcode: 'AA1 1AA' });
    });
  });
});
