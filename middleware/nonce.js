const { v4: uuidv4 } = require('uuid');

const cspHeaderName = 'Content-Security-Policy';

module.exports = (app, enableCsp) => {
  if (enableCsp) {
    // Generate CSP nonce for inline Google Tag Manager script
    app.use((req, res, next) => {
      const nonce = uuidv4();
      const csp = res.get(cspHeaderName);
      res.setHeader(cspHeaderName, `${csp} 'nonce-${nonce}'`);
      res.locals.nonce = nonce;
      next();
    });
  } else {
    // Disable CSP in dev/test environments so it does not block the dynamically
    // injected Google Tag Manager UI analysts use to configure it
    app.use((req, res, next) => {
      res.removeHeader(cspHeaderName);
      next();
    });
  }
};
