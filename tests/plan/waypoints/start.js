const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class Start extends BaseTestWaypoint {
  progress({ httpResponse }) {
    const absUrl = new URL(this.dom('a:contains("Start now")').attr('href') || '', httpResponse.request.url);
    const nextUrl = absUrl.href.replace(absUrl.origin, '');

    return {
      nextUrl,
    };
  }
}

module.exports = Start;
