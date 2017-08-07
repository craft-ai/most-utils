const { expect } = require('chai');
const limiter = require('../src');
const most = require('most');

describe('limiter', function() {
  it('can limit the throughput of a stream to one event every 500ms', function() {
    this.timeout(10000);
    return most.iterate(x => x + 1, 0)
      .take(5)
      .thru(limiter(500))
      .map(() => Date.now())
      .reduce((from, to) => {
        if (from) {
          const duration = to - from;
          expect(duration).to.be.above(500);
          expect(duration).to.be.below(550);
        }
      }, undefined);
  });
  it('does not limit the throughput of a stream when it is slower', function() {
    this.timeout(10000);
    return most.iterate(x => x + 1, 0)
      .take(5)
      .concatMap(x => most.of(x).delay(1000))
      .thru(limiter(500))
      .map(() => Date.now())
      .reduce((from, to) => {
        if (from) {
          const duration = to - from;
          expect(duration).to.be.closeTo(1000);
        }
      }, undefined);
  });
  it('throw an error when the internal buffer overflows', function() {
    return most.iterate(x => x + 1, 0)
      .take(10)
      .thru(limiter(500, 2))
      .drain()
      .then(
        () => { throw new Error('Should not succeed'); },
        e => expect(e).to.be.an('error'));
  });
});
