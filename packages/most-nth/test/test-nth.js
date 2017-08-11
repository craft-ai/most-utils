const { expect } = require('chai');
const { nth, first, last } = require('../src');
const most = require('most');

describe('nth', function() {
  it('can retrieve the first event of a infinite stream', function() {
    return most.iterate(x => x + 1, 0)
      .thru(nth(0))
      .then(event => expect(event).to.be.equal(0));
  });

  it('can retrieve the 8th event of a infinite stream', function() {
    return most.iterate(x => x + 1, 0)
      .thru(nth(7))
      .then(event => expect(event).to.be.equal(7));
  });

  it('can retrieve the last event of a stream', function() {
    return most.iterate(x => x + 1, 0)
      .take(25)
      .thru(nth(-1))
      .then(event => expect(event).to.be.equal(24));
  });

  it('can retrieve the -5th event of a stream', function() {
    return most.iterate(x => x + 1, 0)
      .take(25)
      .thru(nth(-5))
      .then(event => expect(event).to.be.equal(20));
  });

  it('can retrieve the first event of an empty stream', function() {
    return most.empty()
      .thru(nth(0))
      .then(event => expect(event).to.be.undefined);
  });

  it('can retrieve the last event of an empty stream', function() {
    return most.empty()
      .thru(nth(-1))
      .then(event => expect(event).to.be.undefined);
  });

  it('fails when the stream fails', function() {
    return most.iterate(x => x + 1, 0)
      .take(25)
      .concat(most.throwError(new Error('Aw too bad')))
      .thru(nth(34))
      .then(
        event => Promise.reject(new Error('Should not be reached')),
        error => expect(error.toString()).to.be.equal('Error: Aw too bad')
      );
  });

  it('fails when the stream fails (negative index)', function() {
    return most.iterate(x => x + 1, 0)
      .take(25)
      .concat(most.throwError(new Error('Aw too bad')))
      .thru(nth(-1))
      .then(
        event => Promise.reject(new Error('Should not be reached')),
        error => expect(error.toString()).to.be.equal('Error: Aw too bad')
      );
  });

  it('returns "undefined" when the desired index does not exist', function() {
    return most.iterate(x => x + 1, 0)
      .take(25)
      .thru(nth(34))
      .then(event => expect(event).to.be.undefined);
  });

  it('returns "undefined" when the desired index does not exist (negative index)', function() {
    return most.iterate(x => x + 1, 0)
      .take(25)
      .thru(nth(-34))
      .then(event => expect(event).to.be.undefined);
  });
});

describe('first', function() {
  it('can retrieve the first event of a infinite stream', function() {
    return most.iterate(x => x + 1, 0)
      .thru(first)
      .then(event => expect(event).to.be.equal(0));
  });
});

describe('last', function() {
  it('can retrieve the last event of a stream', function() {
    return most.iterate(x => x + 1, 0)
      .take(25)
      .thru(last)
      .then(event => expect(event).to.be.equal(24));
  });
});
