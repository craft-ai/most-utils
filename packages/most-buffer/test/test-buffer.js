const { expect } = require('chai');
const buffer = require('../src');
const most = require('most');

describe('buffer', function() {
  it('can group stream events 10 by 10', function() {
    return most.iterate(x => x + 1, 0)
      .take(60)
      .thru(buffer(10))
      .tap(buffer => expect(buffer).to.have.lengthOf.at.most(10))
      .drain();
  });
  it('can group stream events 50 by 50', function() {
    return most.iterate(x => x + 1, 0)
      .take(25)
      .thru(buffer(50))
      .tap(buffer => expect(buffer).to.have.lengthOf.at.most(50))
      .drain();
  });
});
