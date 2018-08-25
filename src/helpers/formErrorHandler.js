exports.formRequiredFieldHandler = field => (!field ? true : false);

exports.formDatesHander = (startTime, endTime) => startTime > endTime;

exports.formErrorHandler = (...args) => {
  const formErrors = [...args];
  return formErrors.some(error => error);
};
