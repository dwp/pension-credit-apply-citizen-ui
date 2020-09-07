/* global document */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-var, vars-on-top, prefer-arrow-callback, func-names */
import { nodeListForEach } from 'govuk-frontend-src/src/govuk/common';
import Button from 'govuk-frontend-src/src/govuk/components/button/button';
import Checkboxes from 'govuk-frontend-src/src/govuk/components/checkboxes/checkboxes';
import ErrorSummary from 'govuk-frontend-src/src/govuk/components/error-summary/error-summary';
import Header from 'govuk-frontend-src/src/govuk/components/header/header';
import Radios from 'govuk-frontend-src/src/govuk/components/radios/radios';
import TimeoutDialog from 'hmrc-frontend-src/src/components/timeout-dialog/timeout-dialog';
import PrintButton from './js/print-button';
import TimeoutButton from './js/timeout-button';

function initAll(opts) {
  // Set the options to an empty object by default if no options are passed.
  var options = typeof opts !== 'undefined' ? opts : {};

  // Allow the user to initialise GOV.UK Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  var scope = typeof options.scope !== 'undefined' ? options.scope : document;

  var $buttons = scope.querySelectorAll('[data-module="govuk-button"]');
  nodeListForEach($buttons, function ($button) {
    new Button($button).init();
  });

  var $printButtons = scope.querySelectorAll('[data-pc-module="pc-print-button"]');
  nodeListForEach($printButtons, function ($button) {
    new PrintButton($button).init();
  });

  var $timeoutButtons = scope.querySelectorAll('[data-pc-module="pc-timeout-button"]');
  nodeListForEach($timeoutButtons, function ($button) {
    new TimeoutButton($button).init();
  });

  var $checkboxes = scope.querySelectorAll('[data-module="govuk-checkboxes"]');
  nodeListForEach($checkboxes, function ($checkbox) {
    new Checkboxes($checkbox).init();
  });

  // Find first error summary module to enhance.
  var $errorSummary = scope.querySelector('[data-module="govuk-error-summary"]');
  new ErrorSummary($errorSummary).init();

  // Find first header module to enhance.
  var $toggleButton = scope.querySelector('[data-module="govuk-header"]');
  new Header($toggleButton).init();

  var $radios = scope.querySelectorAll('[data-module="govuk-radios"]');
  nodeListForEach($radios, function ($radio) {
    new Radios($radio).init();
  });

  // HMRC Session Timeout Dialog
  var $TimeoutDialog = scope.querySelector('meta[name="hmrc-timeout-dialog"]');
  if ($TimeoutDialog) {
    new TimeoutDialog($TimeoutDialog).init();
  }
}

export {
  initAll,
  Button,
  PrintButton,
  TimeoutButton,
  Checkboxes,
  ErrorSummary,
  Header,
  Radios,
  TimeoutDialog,
};
