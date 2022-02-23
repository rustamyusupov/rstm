const bindButtonEvents = () => {
  const list = document.querySelectorAll('li');

  list.forEach(wish => {
    const button = wish.querySelector('button');
    const id = 1;

    button.addEventListener('click', event => {
      event.stopPropagation();
      window.location += `/${id}`;
    });
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  bindButtonEvents();
});
