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

  // This sends an empty SVG for use the page header crown SVG image tag.
  // By default the image has a empty string as its href, which prevents
  // browsers from requesting it, but IE11 will request '/' when opening the
  // print diaglog. The resulting start page response will initiate a new
  // session wiping the current session on the client.
  app.use(`${mountUrl}empty.svg`, (req, res) => {
    // Do not re-request this on every page.
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

    // Must be a valid SVG or Chrome will render a broken image icon
    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).send('<svg xmlns="http://www.w3.org/2000/svg"></svg>');
  });
};
