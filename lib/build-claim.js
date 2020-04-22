module.exports = (journeyContext) => {
  const data = journeyContext.getData();

  const dob = data['date-of-birth'].dateOfBirth;

  return {
    nino: 'RN001001A',
    dateOfBirth: `${dob.yyyy}-${dob.mm}-${dob.dd}`,
    dateOfClaim: '2020-04-22',
  };
};
