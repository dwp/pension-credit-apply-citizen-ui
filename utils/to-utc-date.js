const toUTCDate = (date) => new Date(
  Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
);

module.exports = toUTCDate;
