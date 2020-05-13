/* eslint-disable prefer-arrow-callback, func-names */
/* global document */
function ready(callback) {
  if (document.readyState !== 'loading') {
    // in case the document is already rendered
    callback();
  } else if (document.addEventListener) {
    // modern browsers
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    // IE <= 8
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState === 'complete') {
        callback();
      }
    });
  }
}

export default ready;
