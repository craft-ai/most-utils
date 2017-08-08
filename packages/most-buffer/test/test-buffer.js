const { expect } = require('chai');
const buffer = require('../src');
const most = require('most');

describe('buffer', function() {
  it('can group stream events 10 by 10', function() {
    let count = 0;
    return most.iterate(x => x + 1, 0)
      .take(25)
      .thru(buffer(10))
      .tap(() => { count += 1; })
      .tap(buffer => expect(buffer).to.have.lengthOf.at.most(10))
      .drain()
      .then(() => expect(count).to.be.equal(3));
  });
  it('can group stream events 50 by 50', function() {
    let count = 0;
    return most.iterate(x => x + 1, 0)
      .take(25)
      .thru(buffer(50))
      .tap(() => { count += 1; })
      .tap(buffer => expect(buffer).to.have.lengthOf(25))
      .drain()
      .then(() => expect(count).to.be.equal(1));
  });
  it('wait for the source stream to be finished emitting anything when no count is given', function() {
    let count = 0;
    return most.iterate(x => x + 1, 0)
      .take(25)
      .thru(buffer())
      .tap(() => { count += 1; })
      .tap(buffer => expect(buffer).to.have.lengthOf(25))
      .drain()
      .then(() => expect(count).to.be.equal(1));
  });
});
