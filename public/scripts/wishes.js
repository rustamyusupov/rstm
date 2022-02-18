const toggleActiveCog = toggle => item =>
  item.classList.toggle('wish--active-cog', toggle);

const bindButtonEvents = () => {
  const list = document.querySelectorAll('li');

  list.forEach(wish => {
    const button = wish.querySelector('button');

    button.addEventListener('click', event => {
      event.stopPropagation();
      list.forEach(toggleActiveCog(false));
      toggleActiveCog(true)(wish);
    });
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  bindButtonEvents();
});
