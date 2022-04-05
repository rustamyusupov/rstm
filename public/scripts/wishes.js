import isTouch from './isTouchDevice.js';

const toggleWishes = show => {
  const wishes = document.querySelectorAll('.wishes__item--archive');

  wishes.forEach(wish => {
    wish.style.display = show ? 'list-item' : 'none';
  });
};

const toggleVisibility = visibility => {
  const url = new URL(window.location.href);

  if (visibility) {
    url.searchParams.set('visibility', 'true');
  } else {
    url.searchParams.delete('visibility');
  }

  window.history.replaceState(null, null, url.toString());
};

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('#page');
  const input = document.querySelector('#visibility');
  const visibility = window.location.search.includes('visibility');

  if (!isTouch()) {
    page.classList.add('not-touch');
  }

  if (!input) {
    return;
  }

  input.checked = visibility;
  toggleWishes(visibility);

  input.addEventListener('change', async () => {
    toggleWishes(input.checked);
    toggleVisibility(input.checked);
  });
});
