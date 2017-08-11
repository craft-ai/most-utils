function nth(desiredIndex) {
  if (desiredIndex < 0) {
    return (stream) => stream
      .reduce((lastEvents, event) => {
        // Keeping a buffer of the nth last received events to be able to retrieve the desired one.
        lastEvents.push(event);
        if (lastEvents.length > -desiredIndex) {
          // Buffer is full, Poping the earliest event from the buffer
          return lastEvents.slice(1);
        }
        return lastEvents;
      }, [])
      // Checking if we actually reached the desired index
      .then((lastEvents) => lastEvents.length === -desiredIndex ? lastEvents[0] : undefined);
  }
  else {
    return (stream) => stream
      .take(desiredIndex + 1)
      .reduce(({ event, index }, currentEvent) => ({
        index: index + 1,
        event: currentEvent
      }), { index: -1 })
      // Checking if we actually reached the desired index
      .then(({ event, index }) => index === desiredIndex ? event : undefined);
  }
}

module.exports = nth;
