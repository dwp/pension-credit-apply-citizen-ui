// Enforce checkboxes value is array or undefined
const checkboxes = ({ fieldValue }) => {
  if (Array.isArray(fieldValue)) {
    return fieldValue;
  }

  return undefined;
};

module.exports = checkboxes;
