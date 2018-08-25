export const formTilteHandler = (title) => {
  if (!title) return true;
  return false;
}

export const formDatesHander = (startTime, endTime) => {
  if (startTime > endTime) return true;
  return false;
}

export const formErrorHandler = () => {
  if (formDatesHander || formTilteHandler) return true;
  return false;
}