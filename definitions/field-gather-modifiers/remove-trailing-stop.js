const removeTrailingStop = ({ fieldValue }) => fieldValue && fieldValue.replace(/\.$/, '');

module.exports = removeTrailingStop;
