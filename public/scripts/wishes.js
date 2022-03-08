const toggleWishes = show => {
  const wishes = document.querySelectorAll('.wishes__item--archive');

  wishes.forEach(wish => {
    wish.style.display = show ? 'list-item' : 'none';
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#visibility');

  if (!input) {
    return;
  }

  toggleWishes(input.checked);
  input.addEventListener('change', async () => {
    toggleWishes(input.checked);
  });
});
