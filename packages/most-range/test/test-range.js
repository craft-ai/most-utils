const { expect } = require('chai');
const range = require('../src');
const buffer = require('most-buffer');

describe('range', function() {
  it('can create a stream of integer from 0 to 5', function() {
    let count = 0;
    return range(0, 5)
      .tap(() => count += 1)
      .thru(buffer())
      .tap((array) => expect(array).to.deep.equal([0, 1, 2, 3, 4]))
      .drain()
      .then(() => expect(count).to.be.equal(5));
  });

  it('can create a stream of integer from 0 to -5', function() {
    let count = 0;
    return range(0, -5)
      .tap(() => count += 1)
      .thru(buffer())
      .tap((array) => expect(array).to.deep.equal([0, -1, -2, -3, -4]))
      .drain()
      .then(() => expect(count).to.be.equal(5));
  });

  it('can create a stream of integer from 2 to -5', function() {
    let count = 0;
    return range(2, -5)
      .tap(() => count += 1)
      .thru(buffer())
      .tap((array) => expect(array).to.deep.equal([2, 1, 0, -1, -2, -3, -4]))
      .drain()
      .then(() => expect(count).to.be.equal(7));
  });

  it('can create a stream of integer from 1 to 3 with steps of 0.5', function() {
    let count = 0;
    return range(1, 3, 0.5)
      .tap(() => count += 1)
      .thru(buffer())
      .tap((array) => expect(array).to.deep.equal([1, 1.5, 2, 2.5]))
      .drain()
      .then(() => expect(count).to.be.equal(4));
  });

  it('can create a stream of integer from 1 to 3.5 with steps of 2', function() {
    let count = 0;
    return range(1, 3.5, 2)
      .tap(() => count += 1)
      .thru(buffer())
      .tap((array) => expect(array).to.deep.equal([1, 3]))
      .drain()
      .then(() => expect(count).to.be.equal(2));
  });

  it('create an empty stream when called with 0 and 0', function() {
    let count = 0;
    return range(0, 0)
      .tap(() => count += 1)
      .thru(buffer())
      .tap((array) => expect(array).to.deep.equal([]))
      .drain()
      .then(() => expect(count).to.be.equal(0));
  });

  it('create an infinite stream when called with a step of 0', function() {
    let count = 0;
    return range(2, 8, 0)
      .take(5)
      .tap(() => count += 1)
      .thru(buffer())
      .tap((array) => expect(array).to.deep.equal([2, 2, 2, 2, 2]))
      .drain()
      .then(() => expect(count).to.be.equal(5));
  });
});

