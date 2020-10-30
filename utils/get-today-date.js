// Return today's date without the time at which it was called
const getTodayDate = () => {
  const now = new Date(Date.now());
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

module.exports = getTodayDate;
