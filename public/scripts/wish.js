import request from './request.js';

document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('#delete');

  button.addEventListener('click', () => {
    request(location.pathname, { method: 'delete' });
    window.location = '/wishes';
  });
});
