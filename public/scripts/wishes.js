import isTouch from './isTouchDevice.js';

const toggleWishes = show => {
  const wishes = document.querySelectorAll('.wishes__item--archive');

  wishes.forEach(wish => {
    wish.style.display = show ? 'list-item' : 'none';
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('#page');
  const input = document.querySelector('#visibility');

  page.classList.add(isTouch() ? '' : 'not-touch');

  if (!input) {
    return;
  }

  toggleWishes(input.checked);
  input.addEventListener('change', async () => {
    toggleWishes(input.checked);
  });
});
