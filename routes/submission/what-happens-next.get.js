module.exports = (req, res) => {
  // Grab data extracted from session prior to submission
  const {
    ownsAdditionalProperty,
    contactDate,
    isNorthernIrelandClaim,
  } = (req.session.claimCompleteData || {});

  res.render('pages/submission/what-happens-next.njk', {
    ownsAdditionalProperty,
    contactDate,
    northernIrelandPrefix: isNorthernIrelandClaim ? 'northernIreland.' : '',
  });
};
