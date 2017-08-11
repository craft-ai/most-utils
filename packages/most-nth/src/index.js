const nth = require('./most-nth.js');

module.exports = {
  nth,
  first: nth(0),
  last: nth(-1)
};
