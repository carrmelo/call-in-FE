export const formRequiredFieldHandler = field => {
  if (!field) return true;
  return false;
};

export const formDatesHander = (startTime, endTime) => {
  if (startTime > endTime) return true;
  return false;
};

export const formErrorHandler = (...args) => {
  const formErrors = [...args];
  return !formErrors.every(error => error);
};
