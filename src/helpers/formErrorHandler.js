export const formRequiredFieldHandler = field => (!field ? true : false);

export const formDatesHander = (startTime, endTime) => startTime > endTime;

export const formErrorHandler = (...args) => {
  const formErrors = [...args];
  return formErrors.some(error => error);
};
