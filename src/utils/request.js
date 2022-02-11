const p = require('phin');

module.exports = options =>
  p
    .defaults({ parse: 'json' })(options)
    .then(res => res?.body);
