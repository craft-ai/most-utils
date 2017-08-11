const MAX_BUFFER_SIZE = 1000;

class Limiter {
  constructor(interval, capacity, sink) {
    this.buffer = [];
    this.capacity = capacity;
    this.ended = false;
    this.interval = interval;
    this.lastEventTime = -interval;
    this.length = 0;
    this.sink = sink;
    this.timeout = undefined;
  }

  _scheduleNextSending(time, value) {
    //console.log('_scheduleNextSending', time, value, this.buffer.length);
    if (this.buffer.length == this.capacity) {
      this.sink.error(time, new Error(`Buffer at full capacity (${this.capacity}).`));
      return;
    }

    if (this.timeout) {
      // There's already a sending scheduled, buffering the new value
      this.buffer.push(value);
      return;
    }

    const nextSendingTime = this.lastEventTime + this.interval;

    if (nextSendingTime > time) {
      // Not yet time to send a new value, scheduling for later
      this.timeout = setTimeout(() => {
        if (this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = undefined;
        }
        this._scheduleNextSending(nextSendingTime, value);
      }, nextSendingTime - time);
      return;
    }

    this.lastEventTime = time;
    if (this.ended && this.buffer.length === 0) {
      // We have received the end of the input and there's no more values in the buffer
      this.sink.end(nextSendingTime, value);
      return;
    }

    // Let's send this value
    this.sink.event(time, value);

    if (this.buffer.length > 0) {
      this._scheduleNextSending(time, this.buffer.shift());
    }
  }

  event(time, value) {
    this._scheduleNextSending(time, value);
  }

  error(time, error) {
    this.sink.error(time, error);
  }

  end(time, value) {
    this.ended = true;
    this._scheduleNextSending(time, value);
  }
}

function limiter(interval, capacity = MAX_BUFFER_SIZE) {
  return (stream) => new stream.constructor({
    run: (sink, scheduler) => stream.source.run(new Limiter(interval, capacity, sink), scheduler)
  });
}

module.exports = limiter;
