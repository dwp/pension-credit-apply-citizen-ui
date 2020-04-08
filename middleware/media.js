const expressjs = require('express');
const npath = require('path');

module.exports = (app, mountUrl, staticDir) => {
  // Deliver project-specific CSS resources
  app.use(
    `${mountUrl}css/apply-citizen-ui.css`,
    expressjs.static(npath.resolve(staticDir, 'css/apply-citizen-ui.css')),
  );
};
