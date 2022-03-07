document.addEventListener('DOMContentLoaded', () => {
  if (location.pathname === '/wishes/add') {
    return;
  }

  const button = document.querySelector('#delete');

  button.addEventListener('click', () => {
    fetch(location.pathname, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      method: 'delete',
    }).then(() => {
      window.location = '/wishes';
    });
  });
});
