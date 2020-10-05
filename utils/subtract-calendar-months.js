const addCalendarMonths = require('./add-calendar-months.js');

const subtractCalendarMonths = (date, months) => {
  const negativeMonths = typeof months === 'number' ? months * -1 : months;
  return addCalendarMonths(date, negativeMonths);
};

module.exports = subtractCalendarMonths;
