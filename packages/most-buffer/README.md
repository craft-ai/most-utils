# `most-buffer` #

Buffer for [most](https://github.com/cujojs/most).

## Installation ##

```console
> yarn add most-buffer
```

_or_

```console
> npm install --save most-buffer
```

```js
const buffer = require('most-buffer');
```

## Usage ##

`stream.thru(buffer(count)) -> Stream`

```
source:               -a--b--c--------d--e--|
most.thru(buffer(3)): -------[a,b,c]--------[d,e]|
```

- `count` is the size of the buffer

## Example ##

```js
const most = require('most');
const buffer = require('most-buffer');

// Logs
// [1, 2, 3, 4]
// [5, 6, 7, 8]
// [9]
most.iterate(x => x + 1, 0)
  .take(9) // 9 first numbers
  .thru(buffer(4)) // In buffer of 4 or less
  .observe(x => console.log(x))
```
