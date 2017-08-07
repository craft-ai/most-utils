# `most-limiter` #

[![Version](https://img.shields.io/npm/v/most-limiter.svg?style=flat-square)](https://npmjs.org/package/most-limiter)

Rate limiter for [most](https://github.com/cujojs/most).

## Installation ##

```console
$ yarn add most-limiter
```

_or_

```console
$ npm install --save most-limiter
```

and then

```js
const limiter = require('most-limiter');
```

## Usage ##

`stream.thru(limiter(interval [, capacity = 1000])) -> Stream`

```
source:                  -a-b-cdef----->
most.thru(limiter(100)): -a-b-c-d-e-f-->
```

- `interval` is the minimum time interval between events, in ms.
- `capacity` is the maximum size of the internal buffer, overrides leads to an error.

```js
const most = require('most');
const limiter = require('most-limiter');

// Logs
// 1
// 2 (after 500ms)
// 3 (after 500ms more)
most.iterate(x => x + 1, 0)
  .take(3) // 3 first numbers
  .thru(limiter(500)) // Limit to on event every 500ms
  .observe(x => console.log(x))
```
