# percentile

[![npm](https://img.shields.io/npm/v/percentile.svg)](https://www.npmjs.com/package/percentile)
[![license](https://img.shields.io/npm/l/percentile.svg)](http://opensource.org/licenses/MIT)
[![github-issues](https://img.shields.io/github/issues/d4rkr00t/percentile.svg)](https://github.com/d4rkr00t/percentile/issues)
[![Build](https://github.com/d4rkr00t/percentile/actions/workflows/build.yml/badge.svg)](https://github.com/d4rkr00t/percentile/actions/workflows/build.yml)
[![coveralls](https://img.shields.io/coveralls/d4rkr00t/percentile.svg)](https://coveralls.io/github/d4rkr00t/percentile)
[![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Calculate a percentile for given array of values.

## Install

```sh
npm install percentile
```

## Usage

```js
// With simple values
const percentile = require("percentile");
console.log(percentile(80, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])); // 8

// With complex values
const percentile = require("percentile");
const result = percentile(
  80,
  [
    { val: 1 }, { val: 2 }, { val: 3 }, { val: 4 }, { val: 5 },
    { val: 6 }, { val: 7 }, { val: 8 }, { val: 9 }, { val: 10 }
  ],
   // function to extract a value from an object
  item => item.val
);
console.log(result); // 8

// With array of percentiles
const percentile = require("percentile");
const result = percentile(
  [70, 80, 90], // calculates 70p, 80p and 90p in one pass
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
console.log(result); // [7, 8, 9]

```
## Notes

Non-numeric (NaN) values are treated as the smallest values, Eg `percentile(50, [ 5, 2, NaN]) === 2`

## Author

Stanislav Sysoev d4rkr00t@gmail.com https://github.com/d4rkr00t

## License

- **MIT** : http://opensource.org/licenses/MIT

## Contributing

Contributing are highly welcome! This repos is commitizen friendly — please read about it [here](http://commitizen.github.io/cz-cli/).
