import request from './request.js';

document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('#delete');

  button.disabled = location.pathname === '/wishes/add';

  button.addEventListener('click', async () => {
    await request(`/api${location.pathname}`, { method: 'delete' });
    window.location = '/wishes';
  });
});
