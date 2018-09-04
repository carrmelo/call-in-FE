// @flow

export const apiFetch = (requestOptions: {
  url: string,
  method?: string,
  body?: {}
}) => {
  const { url, method, body } = requestOptions;
  return fetch(url, {
    method: method || 'GET',
    body: JSON.stringify(body),
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => (response.status === 204 ? response : response.json()));
};

// Trying to centralize the action if the fetch catch an error to avoid repetition
// after using flow this.isLoading gives an error. Further investigation needed. 
// export const apiError = (error: any) => {
//   console.error('---------', error);
//   this.isLoading = false;
// };
