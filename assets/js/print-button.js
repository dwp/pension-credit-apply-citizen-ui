/* global window */
/* eslint-disable import/no-extraneous-dependencies, func-names, valid-jsdoc */
import 'govuk-frontend-src/src/govuk/vendor/polyfills/Event';

function PrintButton($module) {
  this.$module = $module;
}

/**
* Open browser print dialog
*/
PrintButton.prototype.print = function (event) {
  window.print();
  event.preventDefault();
  return false;
};

PrintButton.prototype.init = function () {
  this.$module.addEventListener('click', this.print);
};

export default PrintButton;
