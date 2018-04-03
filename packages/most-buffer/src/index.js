const BufferSink = require('./buffer-sink.js');

function buffer(count = undefined) {
  return (stream) => new stream.constructor({
    run: (sink, scheduler) => stream.source.run(new BufferSink(count, sink), scheduler)
  });
}

module.exports = buffer;
module.exports.default = buffer;
