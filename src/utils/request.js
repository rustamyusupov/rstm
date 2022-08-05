const request = (url, options) =>
  fetch(url, options).then(response => response);

module.exports = request;
