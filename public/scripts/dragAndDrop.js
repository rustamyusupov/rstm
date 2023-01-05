const getDragAfterElement = (list, y) => {
  const wishes = [
    ...list.querySelectorAll('.wishes__item:not(.wishes__item--dragging)'),
  ];

  return wishes.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};

export const initDragAndDrop = () => {
  const lists = document.querySelectorAll('.wishes__list');
  const wishes = document.querySelectorAll('.wishes__item');

  wishes.forEach(wish => {
    wish.addEventListener('dragstart', () => {
      wish.classList.add('wishes__item--dragging');
    });

    wish.addEventListener('dragend', () => {
      wish.classList.remove('wishes__item--dragging');
    });
  });

  lists.forEach(list => {
    list.addEventListener('dragover', e => {
      e.preventDefault();

      const afterElement = getDragAfterElement(list, e.clientY);
      const wish = document.querySelector('.wishes__item--dragging');

      if (!afterElement) {
        list.appendChild(wish);
      } else {
        list.insertBefore(wish, afterElement);
      }
    });
  });
};
