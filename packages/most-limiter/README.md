# `most-limiter` #

[![Version](https://img.shields.io/npm/v/most-limiter.svg?style=flat-square)](https://npmjs.org/package/most-limiter) [![License](https://img.shields.io/badge/license-BSD--3--Clause-42358A.svg?style=flat-square)](https://github.com/craft-ai/most-utils/blob/master/LICENSE)

Lossless rate limiter for [most js](https://github.com/cujojs/most).

Unlike [`most.debounce`](https://github.com/cujojs/most/blob/master/docs/api.md#debounce) or [`most.throttle`](https://github.com/cujojs/most/blob/master/docs/api.md#throttle), with `most-limiter`, each event gets through, unless the internal buffer overrides.

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
stream:                    -a-b---cdef----->
stream.thru(limiter(100)): -a-b---c-d-e-f-->
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
