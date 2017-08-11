const { expect } = require('chai');
const buffer = require('../src');
const most = require('most');

describe('buffer', function() {
  it('can group stream events 10 by 10', function() {
    return most.iterate((x) => x + 1, 0)
      .take(25)
      .thru(buffer(10))
      .tap((buffer) => expect(buffer).to.have.lengthOf.at.most(10))
      .reduce((count) => count + 1, 0)
      .then((count) => expect(count).to.be.equal(3));
  });
  it('can group stream events 50 by 50', function() {
    return most.iterate((x) => x + 1, 0)
      .take(25)
      .thru(buffer(50))
      .tap((buffer) => expect(buffer).to.have.lengthOf(25))
      .reduce((count) => count + 1, 0)
      .then((count) => expect(count).to.be.equal(1));
  });
  it('wait for the source stream to be finished emitting anything when no count is given', function() {
    return most.iterate((x) => x + 1, 0)
      .take(25)
      .thru(buffer())
      .tap((buffer) => expect(buffer).to.have.lengthOf(25))
      .reduce((count) => count + 1, 0)
      .then((count) => expect(count).to.be.equal(1));
  });
});
