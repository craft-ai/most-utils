const { expect } = require('chai');
const buffer = require('../src');
const BufferSink = require('../src/buffer-sink');
const most = require('most');
const {create} = require('@most/create')

describe('buffer', function() {
  it('can group stream events 10 by 10', function() {
    return most.iterate((x) => x + 1, 0)
      .take(25)
      .thru(buffer(10))
      .tap((buffer) => expect(buffer).to.be.an.instanceof(Array).and.to.have.lengthOf.at.most(10))
      .reduce((count) => count + 1, 0)
      .then((count) => expect(count).to.equal(3));
  });
  it('can group stream events 50 by 50', function() {
    return most.iterate((x) => x + 1, 0)
      .take(25)
      .thru(buffer(50))
      .tap((buffer) => expect(buffer).to.be.an.instanceof(Array).and.to.have.lengthOf(25))
      .reduce((count) => count + 1, 0)
      .then((count) => expect(count).to.equal(1));
  });
  it('wait for the source stream to be finished emitting anything when no count is given', function() {
    return most.iterate((x) => x + 1, 0)
      .take(25)
      .thru(buffer())
      .tap((buffer) => expect(buffer).to.be.an.instanceof(Array).and.to.have.lengthOf(25))
      .reduce((count) => count + 1, 0)
      .then((count) => expect(count).to.equal(1));
  });
  it('keep an empty stream empty', function() {
    return most.empty()
      .thru(buffer())
      .reduce((count) => count + 1, 0)
      .then((count) => expect(count).to.equal(0));
  });
  it('skip remaining events after the end of a stream', function() {
    const time = 123;
    const expected = {};

    const sink = new BufferSink(undefined, {
      event(t, x) {
        expect(t).to.equal(time);
        expect(x).to.be.an.instanceof(Array).and.to.have.lengthOf(0);
      },
      error() { throw new Error('Should not be called'); },
      end(t, x) {
        expect(t).to.equal(time);
        expect(x).to.equal(expected);
      }
    });

    sink.end(time, expected);
    sink.end(time + 1);
    sink.event(time + 2);
  });
  it.only('should flush after the given flush period even if the buffer is not full', function(done) {
    const stream$ = create((add, end) => {
      setTimeout(() => add('data'), 10)
      setTimeout(() => add('data'), 20)
      setTimeout(() => add('data'), 50)
      setTimeout(() => {
        add('data');
        end();
      }, 100)
    })

    return stream$
      .take(10)
      .thru(buffer(5, 700))
      .subscribe({
        next: data => {
          expect(data.length < 5).to.be.true
        },
        complete: () => done()
      })
  });
});
