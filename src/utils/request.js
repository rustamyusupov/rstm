export default (url, options) =>
  fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...options,
  }).then(response => response.json());
