class BufferSink {
  constructor(count, sink) {
    this.active = true;
    this.sink = sink;
    this.count = count;
    this.buffer = count === undefined ? [] : new Array(count);
    this.length = 0;
  }

  event(time, value) {
    if (!this.active) {
      return;
    }

    // Buffering the new value
    this.buffer[this.length++] = value;

    // If the buffer has a limit and is full, let's emit it
    if (this.length === this.count) {
      const value = this.buffer;

      this.buffer = new Array(this.count);
      this.length = 0;
      this.sink.event(time, value);
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

    if (this.length) {
      // Sending what's left in the buffer
      this.sink.event(time, this.length < this.count ? this.buffer.slice(0, this.length) : this.buffer);
    }

    // And ending everything
    this.active = false;
    this.sink.end(time, value);
  }
}

module.exports = BufferSink;
