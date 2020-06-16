module.exports = (req, res) => {
  // Grab data extracted from session prior to submission
  const {
    ownsAdditionalProperty,
    contactDate,
    isNorthernIrelandClaim,
  } = (req.session.claimCompleteData || {});

  // Be mindful not to include any PII in this final render
  res.render('pages/submission/what-happens-next.njk', {
    ownsAdditionalProperty,
    contactDate,
    isNorthernIrelandClaim,
    northernIrelandPrefix: isNorthernIrelandClaim ? 'northernIreland.' : '',
  });
};
