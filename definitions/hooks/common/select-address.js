// Matches a postcode and preceding comma at the end of a formatted address line
// eg: 123 FAKE STREET, FAUXVILLE, NOT TOWN[, ZE0 A00]
const addressLinePostcode = /, ?[A-Z0-9]{3,4} [A-Z0-9]{3}$/i;

const prerender = (postcodeWP, manualEntryWP) => (req, res, next) => {
  req.casa = req.casa || Object.create(null);

  // Grab addresses from the postcode-lookup page
  const { addresses = [] } = req.casa.journeyContext.getDataForPage(postcodeWP);

  // Get formatted postcode for display on page from first result
  if (addresses.length > 0) {
    res.locals.postcode = addresses[0].postcode;
  } else {
    res.locals.postcode = '';
  }

  // Map address response to a formatted list appropriate for the govukSelect()
  // Nunjucks macro
  const pageData = req.casa.journeyContext.getDataForPage(req.casa.journeyWaypointId);
  res.locals.addresses = addresses.map((address) => ({
    value: address.uprn,
    // To increase readability of the address line we strip out the postcode
    text: address.completeAddressLine.replace(addressLinePostcode, ''),
    // Select previous selection by default
    selected: pageData ? String(address.uprn) === String(pageData.uprn) : false,
  }));

  // Add default select entry
  res.locals.addresses.unshift({
    value: 'select-address',
    text: req.i18nTranslator.t('select-address:field.address.addressFound', addresses.length),
  });

  // Links to change postcode, or go to manual addresses entry
  res.locals.changePostcodeUrl = `${postcodeWP}#f-postcode`;
  res.locals.manualAddressUrl = `?skipto=${manualEntryWP}`;

  next();
};

const postvalidate = (postcodeWP, hiddenAddressWP, sourceAddressWP) => (req, _, next) => {
  const { addresses = [] } = req.casa.journeyContext.getDataForPage(postcodeWP)
    || Object.create(null);
  const { uprn } = req.casa.journeyContext.getDataForPage(sourceAddressWP)
    || Object.create(null);

  // Find matching address from address service list
  const address = addresses.find((addr) => String(addr.uprn) === String(uprn));

  // Convert address string to address object which can be generically formatted
  const addressObj = address.completeAddressLine
    .replace(addressLinePostcode, '')
    .split(',')
    .reduce((obj, line, index) => ({
      ...obj,
      [`line${index + 1}`]: line.trim(),
    }), {});

  // Re-add postcode and uprn as specifically named properties
  addressObj.postcode = address.postcode;

  // Add address object to HIDDEN_ADDRESS_PAGE
  req.casa.journeyContext.setDataForPage(hiddenAddressWP, {
    address: addressObj,
    addressFrom: 'select',
  });

  next();
};

module.exports = (postcodeWP = '', manualEntryWP = '', hiddenAddressWP = '', sourceAddressWP = '') => ({
  prerender: prerender(postcodeWP, manualEntryWP),
  postvalidate: postvalidate(postcodeWP, hiddenAddressWP, sourceAddressWP),
});
