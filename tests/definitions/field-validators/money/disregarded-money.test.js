const { expectValidatorToFail, expectValidatorToPass } = require('../../../helpers/validator-assertions.js');
const validators = require('../../../../definitions/field-validators/money/disregarded-money.js');

describe('Validators: disregarded-money', () => {
  describe('field: officialErrorDetails', () => {
    it('should not validate if value of "disregardedMoney" is not "checked"', async () => {
      await expectValidatorToPass(validators, 'officialErrorDetails', 'required', null);
    });

    it('should pass required validate if value of "disregardedMoney" is "checked" and a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'officialErrorDetails', 'required', {
        disregardedMoney: ['officialError'],
        officialErrorDetails: 'test',
      });
    });

    it('should fail required validate if value of "disregardedMoney" is "checked" and an empty value is provided', async () => {
      await expectValidatorToFail(validators, 'officialErrorDetails', 'required', {
        disregardedMoney: ['officialError'],
        officialErrorDetails: '',
      }, {
        summary: 'disregarded-money:field.officialErrorDetails.required',
      });
    });

    it('should pass strlen validate if value of "disregardedMoney" is "checked" and string length is <= 500', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'officialErrorDetails', 'strlen', {
        disregardedMoney: ['officialError'],
        officialErrorDetails: longString,
      });
    });

    it('should fail strlen validate if value of "disregardedMoney" is "checked" and string length is > 500', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'officialErrorDetails', 'strlen', {
        disregardedMoney: ['officialError'],
        officialErrorDetails: longString,
      }, {
        summary: 'disregarded-money:field.officialErrorDetails.length',
      });
    });
  });

  describe('field: councilTaxReductionDetails', () => {
    it('should not validate if value of "disregardedMoney" is not "checked"', async () => {
      await expectValidatorToPass(validators, 'councilTaxReductionDetails', 'required', {
        disregardedMoney: [],
        councilTaxReductionDetails: '',
      });
    });

    it('should pass required validate if value of "disregardedMoney" is "checked" and a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'councilTaxReductionDetails', 'required', {
        disregardedMoney: ['councilTaxReduction'],
        councilTaxReductionDetails: 'test',
      });
    });

    it('should fail required validate if value of "disregardedMoney" is "checked" and an empty value is provided', async () => {
      await expectValidatorToFail(validators, 'councilTaxReductionDetails', 'required', {
        disregardedMoney: ['councilTaxReduction'],
        councilTaxReductionDetails: '',
      }, {
        summary: 'disregarded-money:field.councilTaxReductionDetails.required',
      });
    });

    it('should pass strlen validate if value of "disregardedMoney" is "checked" and string length is <= 500', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'councilTaxReductionDetails', 'strlen', {
        disregardedMoney: ['councilTaxReduction'],
        councilTaxReductionDetails: longString,
      });
    });

    it('should fail strlen validate if value of "disregardedMoney" is "checked" and string length is > 500', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'councilTaxReductionDetails', 'strlen', {
        disregardedMoney: ['councilTaxReduction'],
        councilTaxReductionDetails: longString,
      }, {
        summary: 'disregarded-money:field.councilTaxReductionDetails.length',
      });
    });
  });

  describe('field: armedForcesDetails', () => {
    it('should not validate if value of "disregardedMoney" is not "checked"', async () => {
      await expectValidatorToPass(validators, 'armedForcesDetails', 'required', {
        disregardedMoney: [],
        armedForcesDetails: '',
      });
    });

    it('should pass required validate if value of "disregardedMoney" is "checked" and a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'armedForcesDetails', 'required', {
        disregardedMoney: ['armedForces'],
        armedForcesDetails: 'test',
      });
    });

    it('should fail required validate if value of "disregardedMoney" is "checked" and an empty value is provided', async () => {
      await expectValidatorToFail(validators, 'armedForcesDetails', 'required', {
        disregardedMoney: ['armedForces'],
        armedForcesDetails: '',
      }, {
        summary: 'disregarded-money:field.armedForcesDetails.required',
      });
    });

    it('should pass strlen validate if value of "disregardedMoney" is "checked" and string length is <= 500', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'armedForcesDetails', 'strlen', {
        disregardedMoney: ['armedForces'],
        armedForcesDetails: longString,
      });
    });

    it('should fail strlen validate if value of "disregardedMoney" is "checked" and string length is > 500', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'armedForcesDetails', 'strlen', {
        disregardedMoney: ['armedForces'],
        armedForcesDetails: longString,
      }, {
        summary: 'disregarded-money:field.armedForcesDetails.length',
      });
    });
  });

  describe('field: personalInjuryDetails', () => {
    it('should not validate if value of "disregardedMoney" is not "checked"', async () => {
      await expectValidatorToPass(validators, 'personalInjuryDetails', 'required', {
        disregardedMoney: [],
        personalInjuryDetails: '',
      });
    });

    it('should pass required validate if value of "disregardedMoney" is "checked" and a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'personalInjuryDetails', 'required', {
        disregardedMoney: ['personalInjury'],
        personalInjuryDetails: 'test',
      });
    });

    it('should fail required validate if value of "disregardedMoney" is "checked" and an empty value is provided', async () => {
      await expectValidatorToFail(validators, 'personalInjuryDetails', 'required', {
        disregardedMoney: ['personalInjury'],
        personalInjuryDetails: '',
      }, {
        summary: 'disregarded-money:field.personalInjuryDetails.required',
      });
    });

    it('should pass strlen validate if value of "disregardedMoney" is "checked" and string length is <= 500', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'personalInjuryDetails', 'strlen', {
        disregardedMoney: ['personalInjury'],
        personalInjuryDetails: longString,
      });
    });

    it('should fail strlen validate if value of "disregardedMoney" is "checked" and string length is > 500', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'personalInjuryDetails', 'strlen', {
        disregardedMoney: ['personalInjury'],
        personalInjuryDetails: longString,
      }, {
        summary: 'disregarded-money:field.personalInjuryDetails.length',
      });
    });
  });

  describe('field: homeInsuranceDetails', () => {
    it('should not validate if value of "disregardedMoney" is not "checked"', async () => {
      await expectValidatorToPass(validators, 'homeInsuranceDetails', 'required', {
        disregardedMoney: [],
        homeInsuranceDetails: '',
      });
    });

    it('should pass required validate if value of "disregardedMoney" is "checked" and a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'homeInsuranceDetails', 'required', {
        disregardedMoney: ['homeInsurance'],
        homeInsuranceDetails: 'test',
      });
    });

    it('should fail required validate if value of "disregardedMoney" is "checked" and an empty value is provided', async () => {
      await expectValidatorToFail(validators, 'homeInsuranceDetails', 'required', {
        disregardedMoney: ['homeInsurance'],
        homeInsuranceDetails: '',
      }, {
        summary: 'disregarded-money:field.homeInsuranceDetails.required',
      });
    });

    it('should pass strlen validate if value of "disregardedMoney" is "checked" and string length is <= 500', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'homeInsuranceDetails', 'strlen', {
        disregardedMoney: ['homeInsurance'],
        homeInsuranceDetails: longString,
      });
    });

    it('should fail strlen validate if value of "disregardedMoney" is "checked" and string length is > 500', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'homeInsuranceDetails', 'strlen', {
        disregardedMoney: ['homeInsurance'],
        homeInsuranceDetails: longString,
      }, {
        summary: 'disregarded-money:field.homeInsuranceDetails.length',
      });
    });
  });

  describe('field: homeRepairsDetails', () => {
    it('should not validate if value of "disregardedMoney" is not "checked"', async () => {
      await expectValidatorToPass(validators, 'homeRepairsDetails', 'required', {
        disregardedMoney: [],
        homeRepairsDetails: '',
      });
    });

    it('should pass required validate if value of "disregardedMoney" is "checked" and a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'homeRepairsDetails', 'required', {
        disregardedMoney: ['homeRepairs'],
        homeRepairsDetails: 'test',
      });
    });

    it('should fail required validate if value of "disregardedMoney" is "checked" and an empty value is provided', async () => {
      await expectValidatorToFail(validators, 'homeRepairsDetails', 'required', {
        disregardedMoney: ['homeRepairs'],
        homeRepairsDetails: '',
      }, {
        summary: 'disregarded-money:field.homeRepairsDetails.required',
      });
    });

    it('should pass strlen validate if value of "disregardedMoney" is "checked" and string length is <= 500', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'homeRepairsDetails', 'strlen', {
        disregardedMoney: ['homeRepairs'],
        homeRepairsDetails: longString,
      });
    });

    it('should fail strlen validate if value of "disregardedMoney" is "checked" and string length is > 500', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'homeRepairsDetails', 'strlen', {
        disregardedMoney: ['homeRepairs'],
        homeRepairsDetails: longString,
      }, {
        summary: 'disregarded-money:field.homeRepairsDetails.length',
      });
    });
  });

  describe('field: liveIndependentDetails', () => {
    it('should not validate if value of "disregardedMoney" is not "checked"', async () => {
      await expectValidatorToPass(validators, 'liveIndependentDetails', 'required', {
        disregardedMoney: [],
        liveIndependentDetails: '',
      });
    });

    it('should pass required validate if value of "disregardedMoney" is "checked" and a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'liveIndependentDetails', 'required', {
        disregardedMoney: ['liveIndependent'],
        liveIndependentDetails: 'test',
      });
    });

    it('should fail required validate if value of "disregardedMoney" is "checked" and an empty value is provided', async () => {
      await expectValidatorToFail(validators, 'liveIndependentDetails', 'required', {
        disregardedMoney: ['liveIndependent'],
        liveIndependentDetails: '',
      }, {
        summary: 'disregarded-money:field.liveIndependentDetails.required',
      });
    });

    it('should pass strlen validate if value of "disregardedMoney" is "checked" and string length is <= 500', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'liveIndependentDetails', 'strlen', {
        disregardedMoney: ['liveIndependent'],
        liveIndependentDetails: longString,
      });
    });

    it('should fail strlen validate if value of "disregardedMoney" is "checked" and string length is > 500', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'liveIndependentDetails', 'strlen', {
        disregardedMoney: ['liveIndependent'],
        liveIndependentDetails: longString,
      }, {
        summary: 'disregarded-money:field.liveIndependentDetails.length',
      });
    });
  });

  describe('field: incidentDetails', () => {
    it('should not validate if value of "disregardedMoney" is not "checked"', async () => {
      await expectValidatorToPass(validators, 'incidentDetails', 'required', {
        disregardedMoney: [],
        incidentDetails: '',
      });
    });

    it('should pass required validate if value of "disregardedMoney" is "checked" and a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'incidentDetails', 'required', {
        disregardedMoney: ['incident'],
        incidentDetails: 'test',
      });
    });

    it('should fail required validate if value of "disregardedMoney" is "checked" and an empty value is provided', async () => {
      await expectValidatorToFail(validators, 'incidentDetails', 'required', {
        disregardedMoney: ['incident'],
        incidentDetails: '',
      }, {
        summary: 'disregarded-money:field.incidentDetails.required',
      });
    });

    it('should pass strlen validate if value of "disregardedMoney" is "checked" and string length is <= 500', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'incidentDetails', 'strlen', {
        disregardedMoney: ['incident'],
        incidentDetails: longString,
      });
    });

    it('should fail strlen validate if value of "disregardedMoney" is "checked" and string length is > 500', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'incidentDetails', 'strlen', {
        disregardedMoney: ['incident'],
        incidentDetails: longString,
      }, {
        summary: 'disregarded-money:field.incidentDetails.length',
      });
    });
  });

  describe('field: windrushDetails', () => {
    it('should not validate if value of "disregardedMoney" is not "checked"', async () => {
      await expectValidatorToPass(validators, 'windrushDetails', 'required', {
        disregardedMoney: [],
        windrushDetails: '',
      });
    });

    it('should pass required validate if value of "disregardedMoney" is "checked" and a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'windrushDetails', 'required', {
        disregardedMoney: ['windrush'],
        windrushDetails: 'test',
      });
    });

    it('should fail required validate if value of "disregardedMoney" is "checked" and an empty value is provided', async () => {
      await expectValidatorToFail(validators, 'windrushDetails', 'required', {
        disregardedMoney: ['windrush'],
        windrushDetails: '',
      }, {
        summary: 'disregarded-money:field.windrushDetails.required',
      });
    });

    it('should pass strlen validate if value of "disregardedMoney" is "checked" and string length is <= 500', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'windrushDetails', 'strlen', {
        disregardedMoney: ['windrush'],
        windrushDetails: longString,
      });
    });

    it('should fail strlen validate if value of "disregardedMoney" is "checked" and string length is > 500', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'windrushDetails', 'strlen', {
        disregardedMoney: ['windrush'],
        windrushDetails: longString,
      }, {
        summary: 'disregarded-money:field.windrushDetails.length',
      });
    });
  });

  describe('field: bloodDetails', () => {
    it('should not validate if value of "disregardedMoney" is not "checked"', async () => {
      await expectValidatorToPass(validators, 'bloodDetails', 'required', {
        disregardedMoney: [],
        bloodDetails: '',
      });
    });

    it('should pass required validate if value of "disregardedMoney" is "checked" and a non-empty value is provided', async () => {
      await expectValidatorToPass(validators, 'bloodDetails', 'required', {
        disregardedMoney: ['blood'],
        bloodDetails: 'test',
      });
    });

    it('should fail required validate if value of "disregardedMoney" is "checked" and an empty value is provided', async () => {
      await expectValidatorToFail(validators, 'bloodDetails', 'required', {
        disregardedMoney: ['blood'],
        bloodDetails: '',
      }, {
        summary: 'disregarded-money:field.bloodDetails.required',
      });
    });

    it('should pass strlen validate if value of "disregardedMoney" is "checked" and string length is <= 500', async () => {
      const longString = Array(501).join('x');
      await expectValidatorToPass(validators, 'bloodDetails', 'strlen', {
        disregardedMoney: ['blood'],
        bloodDetails: longString,
      });
    });

    it('should fail strlen validate if value of "disregardedMoney" is "checked" and string length is > 500', async () => {
      const longString = Array(502).join('x');
      await expectValidatorToFail(validators, 'bloodDetails', 'strlen', {
        disregardedMoney: ['blood'],
        bloodDetails: longString,
      }, {
        summary: 'disregarded-money:field.bloodDetails.length',
      });
    });
  });
});
