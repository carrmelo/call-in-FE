exports.apiFetch = requestOptions => {
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

exports.apiError = error => {
  console.error('---------', error);
  this.isLoading = false;
};
