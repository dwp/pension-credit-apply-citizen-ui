const { waypoints: WP } = require('../lib/constants.js');

module.exports = () => {
  const pages = Object.create(null);

  pages[WP.START] = {
    view: 'pages/start.njk',
    fieldValidators: Object.create(null),
  };

  return pages;
};
