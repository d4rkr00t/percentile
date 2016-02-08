/**
 * Error message for case when percentile is less than 0
 *
 * @param {Number} p
 *
 * @return {String}
 */
function lessThanZeroError(p) {
  return 'Percentile expect number >= 0 but given "' + p + '" and its type is "' + (typeof p) + '".';
}

/**
 * Error message for case when percentile is grater than 100
 *
 * @param {Number} p
 *
 * @return {String}
 */
function graterThanHundredError(p) {
  return 'Percentile expect number <= 100 but given "' + p + '" and its type is "' + (typeof p) + '".';
}

/**
 * Error message for case when percentile is NaN
 *
 * @param {Number} p
 *
 * @return {String}
 */
function nanError(p) {
  return 'Percentile expect number but given "' + p + '" and its type is "' + (typeof p) + '".';
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
    throw new Error(graterThanHundredError(p));
  }

  list = list.sort(function (a, b) {
    if (fn) {
      a = fn(a);
      b = fn(b);
    }

    if (a > b) return 1;
    if (a < b) return -1;

    return 0;
  });

  if (p === 0) return list[0];

  var kIndex = Math.ceil(list.length * (p / 100)) - 1;

  return list[kIndex];
}

module.exports = percentile;
