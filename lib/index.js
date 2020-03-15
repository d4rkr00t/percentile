/**
 * Error message for case when percentile is less than 0
 *
 * @param {Number} p
 *
 * @return {String}
 */
function lessThanZeroError(p) {
  return 'Expect percentile to be >= 0 but given "' + p + '" and its type is "' + (typeof p) + '".';
}

/**
 * Error message for case when percentile is greater than 100
 *
 * @param {Number} p
 *
 * @return {String}
 */
function greaterThanHundredError(p) {
  return 'Expect percentile to be <= 100 but given "' + p + '" and its type is "' + (typeof p) + '".';
}

/**
 * Error message for case when percentile is not a number (NaN)
 *
 * @param {Number} p
 *
 * @return {String}
 */
function nanError(p) {
  return 'Expect percentile to be a number but given "' + p + '" and its type is "' + (typeof p) + '".';
}

/**
 * Calculate percentile for given array of values.
 *
 * @param {Number} p - percentile
 * @param {Array} list - array of values
 * @param {Function} [fn] - optional function to extract value from array
 *
 * @return {*}
 */
function percentile(p, list, fn) {
  if (isNaN(Number(p))) {
    throw new Error(nanError(p));
  }

  p = Number(p);

  if (p < 0) {
    throw new Error(lessThanZeroError(p));
  }

  if (p > 100) {
    throw new Error(greaterThanHundredError(p));
  }

  list = list.slice().sort(function (a, b) {
    if (fn) {
      a = fn(a);
      b = fn(b);
    }

    a = Number.isNaN(a) ? Number.NEGATIVE_INFINITY : a;
    b = Number.isNaN(b) ? Number.NEGATIVE_INFINITY : b;

    if (a > b) return 1;
    if (a < b) return -1;

    return 0;
  });

  if (p === 0) return list[0];

  var kIndex = Math.ceil(list.length * (p / 100)) - 1;

  return list[kIndex];
}

module.exports = percentile;
