document.addEventListener('DOMContentLoaded', () => {
  if (location.pathname === '/wishes/add') {
    return;
  }

  const button = document.querySelector('#delete');

  const handleClick = () => {
    fetch(location.pathname, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      method: 'delete',
    }).then(() => {
      window.location = '/wishes';
    });
  };

  button.addEventListener('click', handleClick);
});
