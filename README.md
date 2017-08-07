# `most` utils #

[![Build](https://img.shields.io/travis/craft-ai/most-utils/master.svg?style=flat-square)](https://travis-ci.org/craft-ai/most-utils) [![License](https://img.shields.io/badge/license-BSD--3--Clause-42358A.svg?style=flat-square)](LICENSE)

A collection of utilities for [most](https://github.com/cujojs/most).

## Packages ##

### [`most-buffer`](./packages/most-buffer) ###

A buffer, collecting stream events in buffer of a given size.

### [`most-limiter`](./packages/most-limiter) ###

A rate limiter, delaying stream events according to a given rate.

## Developers ##

### Local development & testing ###

These packages requires [Node v6.9](https://nodejs.org/en/download/) or later and [yarn](https://yarnpkg.com/en/docs/install).

> The following commands can be run in the root directory or in any of the package's

- Install dependencies:
  ```console
  > yarn install
  ```
- Lint the code:
  ```console
  > yarn run lint
  ```
- Run the tests:
  ```console
  > yarn run test
  ```
