function nth(desiredIndex) {
  if (desiredIndex < 0) {
    return (stream) => stream
      .reduce((lastEvents, event) => {
        lastEvents.push(event);
        if (lastEvents.length > -desiredIndex) {
          return lastEvents.slice(1);
        }
        return lastEvents;
      }, [])
      .then((lastEvents) => lastEvents.length === -desiredIndex ? lastEvents[0] : undefined);
  }
  else {
    return (stream) => stream
      .take(desiredIndex + 1)
      .reduce(({ event, index }, currentEvent) => ({
        index: index + 1,
        event: currentEvent
      }), { index: -1 })
      .then(({ event, index }) => index === desiredIndex ? event : undefined);
  }
}

module.exports = nth;
