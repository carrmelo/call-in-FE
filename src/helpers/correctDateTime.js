export const toCorrectDate = date => {
  const timeZone = date.getTimezoneOffset(),
    dif = timeZone >= 0 ? '+' : '-',
    pad = function(num) {
      const norm = Math.floor(Math.abs(num));
      return (norm < 10 ? '0' : '') + norm;
    };
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}${dif}${pad(timeZone / 60)}:${pad(timeZone % 60)}`;
};
