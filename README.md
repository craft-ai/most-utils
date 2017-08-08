# `most` utils #

[![Build](https://img.shields.io/travis/craft-ai/most-utils/master.svg?style=flat-square)](https://travis-ci.org/craft-ai/most-utils) [![License](https://img.shields.io/badge/license-BSD--3--Clause-42358A.svg?style=flat-square)](LICENSE)

A collection of utilities for [most](https://github.com/cujojs/most).

## Packages ##

### [`most-buffer`](./packages/most-buffer) [![Version](https://img.shields.io/npm/v/most-buffer.svg?style=flat-square)](https://npmjs.org/package/most-buffer) ###

A buffer, collecting stream events in buffer of a given size.

### [`most-limiter`](./packages/most-limiter) [![Version](https://img.shields.io/npm/v/most-limiter.svg?style=flat-square)](https://npmjs.org/package/most-limiter) ###

A rate limiter, delaying stream events according to a given rate.


### [`most-range`](./packages/most-range) [![Version](https://img.shields.io/npm/v/most-range.svg?style=flat-square)](https://npmjs.org/package/most-range) ###

A factory of stream spanning a range of number.

## Developers ##

### Local development & testing ###

These packages requires [Node v6.9](https://nodejs.org/en/download/) or later and [yarn](https://yarnpkg.com/en/docs/install).

> The following commands can be run in the root directory or in any of the package's

- Install dependencies:
  ```console
  $ yarn install
  ```
- Lint the code:
  ```console
  $ yarn run lint
  ```
- Run the tests:
  ```console
  $ yarn run test
  ```

### Releasing a new version (needs administrator rights) ###

1. Make sure the build of the master branch is [passing](https://travis-ci.org/craft-ai/most-utils).
2. Checkout the master branch locally.

  ```console
  $ git fetch
  $ git checkout master
  $ git reset --hard origin/master
  ```
4. Increment the version of all packages and move _Unreleased_ section
   of `CHANGELOG.md` to a newly created section for this version.

  ```console
  $ ./scripts/update_version.sh patch
  ```

  `./scripts/update_version.sh minor` and `./scripts/update_version.sh major` are
  also available - see [semver](http://semver.org) for a guideline on when to
  use which.

  > This will create a git commit and a git tag.

5. Push everything.

  ```console
  $ git push origin master --tags
  ```

  > This will trigger the publishing of this new version of the packages by [travis](https://travis-ci.org/craft-ai/most-utils).
