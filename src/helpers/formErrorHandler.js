// @flow

export const formRequiredFieldHandler = (field: string): boolean => (!field ? true : false);

export const formDatesHander = (startTime: string, endTime: string): boolean => startTime > endTime;

export const formErrorHandler = (...args: Array<boolean>): boolean => {
  const formErrors = [...args];
  return formErrors.some(error => error);
};
