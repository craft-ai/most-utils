class BufferSink {
  constructor(count, sink) {
    this.active = true;
    this.sink = sink;
    this.count = count;
    this.buffer = [];
  }

  event(time, value) {
    if (!this.active) {
      return;
    }

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

  end(time, value) {
    if (!this.active) {
      return;
    }

    // Sending what's left in the buffer
    this.sink.event(time, this.buffer);
    this.buffer = [];

    // And ending everything
    this.active = false;
    this.sink.end(time, value);
  }
}

module.exports = BufferSink;
