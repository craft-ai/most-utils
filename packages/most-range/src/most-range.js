const { unfold } = require('most');
const toNumber = require('lodash.tonumber');

function range(start, end, step = undefined) {
  start = toNumber(start);
  end = toNumber(end);
  step = step === undefined ? (start < end ? 1 : -1) : toNumber(step);
  return unfold((previousSeed) => ({
    value: previousSeed,
    seed: previousSeed + step,
    done: step < 0 ? previousSeed <= end : previousSeed >= end
  }), start);
}

module.exports = range;
