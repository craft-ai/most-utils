# `most-range` #

[![Version](https://img.shields.io/npm/v/most-range.svg?style=flat-square)](https://npmjs.org/package/most-range)

Creates a [most](https://github.com/cujojs/most) stream of numbers (positive and/or negative) progressing from start up, or dnw to, but not including, end.

## Installation ##

```console
$ yarn add most-range
```

_or_

```console
$ npm install --save most-range
```

```js
const range = require('most-range');
```

## Usage ##

`range(start, end [, step = 1 or -1]) -> Stream`

```
range(0, 10, 2): -0-2-4-6-8-|
```

- `start` is the start of the range.
- `end` is the end of the range, its value is excluded.
- `step` is the value to increment or decrement by, the default is 1 if `end` is greater than `start`, -1 otherwise.

## Example ##

```js
const range = require('most-range');

// Logs
// 10
// 7
// 4
// 1
range(10, 0, -3)
  .observe(x => console.log(x))
```
