class Buffer {
  constructor(count, sink) {
    this.sink = sink;
    this.count = count;
    this.buffer = [];
  }

  event(time, value) {
    // Buffering the new value
    this.buffer.push(value);

    // If the buffer has a limit and is full, let's emit it
    if (this.count && this.buffer.length === this.count) {
      this.sink.event(time, this.buffer);
      this.buffer = [];
    }
  }

  error(time, error) {
    // Forward errors
    this.sink.error(time, error);
  }

  end(time) {
    // Sending what's left in the buffer
    this.sink.event(time, this.buffer);
    this.buffer = [];

    // And ending everything
    this.sink.end(time);
  }
}

function buffer(count = undefined) {
  return stream => new stream.constructor({
    run: (sink, scheduler) => stream.source.run(new Buffer(count, sink), scheduler)
  });
}

module.exports = buffer;
