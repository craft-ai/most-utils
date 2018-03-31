# Changelog #

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/craft-ai/most-utils/compare/v0.0.10...HEAD) ##
## Fixed ##
- `most-buffer` - Empty arrays were emitted in a stream with a deffered sink.
- `most-buffer` - An empty array was emitted with an empty stream.
## Changed ##
- `most-buffer` - Use fixed size arrays to buffer the events.

## [0.0.10](https://github.com/craft-ai/most-utils/compare/v0.0.9...v0.0.10) - 2017-09-26 ##
## Changed ##
- Updated `most js` peer dependency to 1.7 to include a [fix to the `thru` function signature](https://github.com/cujojs/most/releases/tag/1.6.0); it is needed for the proper usage of `most-nth` with TypeScript.

## [0.0.9](https://github.com/craft-ai/most-utils/compare/v0.0.8...v0.0.9) - 2017-08-11 ##
### Added ###
- `most-nth` - Initial implementation for individual events retrieval.

## [0.0.8](https://github.com/craft-ai/most-utils/compare/v0.0.7...v0.0.8) - 2017-08-11 ##
### Changed ###
- Updated the packages description and keywords.

## [0.0.7](https://github.com/craft-ai/most-utils/compare/v0.0.6...v0.0.7) - 2017-08-08 ##
### Added ###
- `most-buffer` - It is now possible to not provide the `count` argument to buffer the full stream.
- `most-range` - Initial implementation for a range stream creation.

## [0.0.6](https://github.com/craft-ai/most-utils/compare/v0.0.5...v0.0.6) - 2017-08-08 ##
### Changed ###
- Improvement to the packages documentation.

### Fixed ###
- Module export support both `import` and `require()`.

## [0.0.5](https://github.com/craft-ai/most-utils/compare/v0.0.4...v0.0.5) - 2017-08-07 ##
### Fixed ###
- The TypeScript definitions now properly export their stuffs.

## [0.0.4](https://github.com/craft-ai/most-utils/compare/v0.0.3...v0.0.4) - 2017-08-07 ##
### Added ###
- TypeScript definitions for all the packages.

## [0.0.3](https://github.com/craft-ai/most-utils/compare/v0.0.2...v0.0.3) - 2017-08-07 ##
### Added ###
- Automatic deployment to npm by travis.

### Changed ###
- Forcing the publication of all the packages when needed.

## [0.0.2](https://github.com/craft-ai/most-utils/compare/v0.0.1...v0.0.2) - 2017-08-07 ##
### Added ###
- `most-buffer` - Initial implementation of a buffer for [most](https://github.com/cujojs/most).
- `most-limiter` - Initial implementation of a rate limiter for [most](https://github.com/cujojs/most).
