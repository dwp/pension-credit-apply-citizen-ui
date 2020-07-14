const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class ContactFormats extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      audio: '[name="contactFormats[]"][value="audio"]',
      braille: '[name="contactFormats[]"][value="braille"]',
      largePrint: '[name="contactFormats[]"][value="largePrint"]',
      textPhone: '[name="contactFormats[]"][value="textPhone"]',
      typeTalk: '[name="contactFormats[]"][value="typeTalk"]',
      other: '[name="contactFormats[]"][value="other"]',
    };
  }
}

module.exports = ContactFormats;
