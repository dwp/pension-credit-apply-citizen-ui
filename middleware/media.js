const expressjs = require('express');
const npath = require('path');

module.exports = (app, mountUrl, staticDir, aggresivelyCache) => {
  const cacheOptions = aggresivelyCache ? {
    etag: false,
    lastModified: false,
    immutable: true,
    maxAge: 31536000000,
  } : {
    etag: true,
    lastModified: true,
  };

  // Deliver frontend CSS and JS assets
  app.use(mountUrl, expressjs.static(npath.resolve(staticDir), cacheOptions));

  // Send simple 404 response for missing assets
  app.use([`${mountUrl}css/`, `${mountUrl}js/`], (req, res) => res.status(404).send('Not found'));
};
