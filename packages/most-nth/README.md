# `most-nth` #

[![Version](https://img.shields.io/npm/v/most-nth.svg?style=flat-square)](https://npmjs.org/package/most-nth) [![License](https://img.shields.io/badge/license-BSD--3--Clause-42358A.svg?style=flat-square)](https://github.com/craft-ai/most-utils/blob/master/LICENSE)

Gets the event at ordinal index `n` of a [most js](https://github.com/cujojs/most) stream as a Promise. If `n` is negative (and the stream finishes), the nth element from the end is returned.

## Installation ##

Using npm:

```console
$ npm install --save most-nth
```

In Node.js:

```js
const { nth, first, last } = require('most-nth');
```

## Usage ##

### nth ###

`stream.thru(nth(index)) -> Promise`

```
stream:              -a--b--c----d-->
stream.thru(nth(2)):        c
```

### first ###

`stream.thru(first) -> Promise`

```
stream:              -a--b--c----d-->
stream.thru(first):   a
```

### last ###

`stream.thru(last) -> Promise`

```
stream:              -a--b--c--d--|
stream.thru(last):                a
```

## Examples ##

```js
const most = require('most');
const { nth } = require('most-nth');

// Logs
// 4
most.iterate(x => x + 1, 0)
  .take(9) // 9 first numbers
  .thru(nth(4)) // Retrieve the event at index 4
  .then(x => console.log(x))
```

```js
const most = require('most');
const { nth } = require('most-nth');

// Logs
// 7
most.iterate(x => x + 1, 0)
  .take(9) // 9 first numbers
  .thru(nth(-2)) // Retrieve the 2nd event from the end
  .then(x => console.log(x))
```

```js
const most = require('most');
const { first } = require('most-nth');

// Logs
// 0
most.iterate(x => x + 1, 0)
  .take(9) // 9 first numbers
  .thru(first) // Retrieve the first event
  .then(x => console.log(x))
```

```js
const most = require('most');
const { last } = require('most-nth');

// Logs
// 8
most.iterate(x => x + 1, 0)
  .take(9) // 9 first numbers
  .thru(last) // Retrieve the last event
  .then(x => console.log(x))
```
