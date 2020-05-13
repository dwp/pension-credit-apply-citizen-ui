/* eslint-disable consistent-return, prefer-arrow-callback, no-var, func-names */
/* eslint-disable import/no-extraneous-dependencies, prefer-destructuring, valid-jsdoc */
import 'govuk-frontend-src/src/govuk/vendor/polyfills/Event';
import 'govuk-frontend-src/src/govuk/vendor/polyfills/Function/prototype/bind';
import Button from 'govuk-frontend-src/src/govuk/components/button/button';

function TimeoutButton($module) {
  this.$module = $module;
  this.debounceFormSubmitTimer = null;
}

/**
* If the click quickly succeeds a previous click then nothing will happen.
* This stops people accidentally causing multiple form submissions by
* double clicking buttons.
*/
TimeoutButton.prototype.debounce = function (event) {
  var target = event.target;

  // Get debounce timeout length or default to 1 second
  var debounceTimeout = target.getAttribute('data-debounce-timeout') || 1;

  // If the timer is still running then we want to prevent the click from
  // submitting the form
  if (this.debounceFormSubmitTimer) {
    event.preventDefault();
    return false;
  }

  this.debounceFormSubmitTimer = setTimeout(function () {
    this.debounceFormSubmitTimer = null;
  }.bind(this), parseInt(debounceTimeout, 10) * 1000);
};

/**
* Initialise an event listener for keydown at document level
* this will help listening for later inserted elements with a role="button"
*/
TimeoutButton.prototype.init = function () {
  this.$module.removeEventListener('click', Button.prototype.debounce);
  this.$module.addEventListener('click', this.debounce);
};

export default TimeoutButton;
