# changelog

## v0.3.7
_2023-11-03_

* allow newer versions of `esbuild`

## v0.3.6
_2023-04-02_

* report single messages for `throwOnWarning` and `throwOnError`

## v0.3.5
_2023-03-20_

* actually make esbuild throw, when `throwOnWarning && !throwOnError`

## v0.3.4
_2023-03-18_

* re-write in typescript

## v0.3.3
_2023-03-18_

* fix error throwing

## v0.3.2
_2023-03-18_

* fix types

## v0.3.1
_2023-03-10_

* fix typo in `throwOnWarning` message

## v0.3.0
_2023-03-10_

* add `throwOnError` and `throwOnWarning` options

## v0.2.0
_2023-03-10_

* fix tests
* update dependencies

## v0.1.1
_2022-08-30_

* fix types

## v0.1.0
_2022-08-22_

* introduce `filter` property
* fix the unwanted linting of `node_modules`
* hook `eslint` into `onEnd` instead of `onLoad` for performance benefits

## v0.0.1
_2022-02-01_

* initial release
