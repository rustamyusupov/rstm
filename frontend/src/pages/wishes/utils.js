// const statuses = {
//   archive: 'archive',
//   bought: 'bought',
//   hidden: 'hidden',
//   presented: 'presented',
//   unwanted: 'unwanted',
// };

const getPrice = ({ price, currency, ...rest }) => ({
  price: Math.ceil(price).toLocaleString('ru', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }),
  ...rest,
});

const notArchive = ({ statuses }) => !statuses.includes('archive');

export const getContent = data => {
  const content = data.map(({ name, wishes }) => ({
    name,
    wishes: wishes.filter(notArchive).map(getPrice),
  }));

  return content;
};
