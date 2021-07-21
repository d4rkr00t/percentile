/**
 @typedef {(Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array)} TypedArray
 */

/**
 * Error message for a case when percentile is less than 0.
 *
 * @param {Number} p
 *
 * @return {String}
 */
function lessThanZeroError(p) {
  return 'Expect percentile to be >= 0 but given "' + p + '" and its type is "' + (typeof p) + '".';
}

/**
 * Error message for a case when percentile is greater than 100.
 *
 * @param {Number} p
 *
 * @return {String}
 */
function greaterThanHundredError(p) {
  return 'Expect percentile to be <= 100 but given "' + p + '" and its type is "' + (typeof p) + '".';
}

/**
 * Error message for a case when percentile is not a number (NaN).
 *
 * @param {Number} p
 *
 * @return {String}
 */
function nanError(p) {
  return 'Expect percentile to be a number but given "' + p + '" and its type is "' + (typeof p) + '".';
}

/**
 * Checks that a list of percentiles are all numbers and they lie in range 0..100.
 *
 * @param {Array<Number>} ps - percentiles to calculate
 *
 * @return {Array} List of errors
 */
function validateInput(ps) {
  return ps.reduce(function (errors, p) {
    if (isNaN(Number(p))) {
      errors.push(nanError(p));
    } else if (p < 0) {
      errors.push(lessThanZeroError(p));
    } else if (p > 100) {
      errors.push(greaterThanHundredError(p));
    }
    return errors;
  }, []);
}

/**
 * Get percentile value from an array.
 *
 * @param {Number} p - percentile
 * @param {Array|TypedArray} list - list of values
 *
 * @return {*}
 */
function getPsValue(p, list) {
  if (p === 0) return list[0];
  var kIndex = Math.ceil(list.length * (p / 100)) - 1;
  return list[kIndex];
}

/**
 * Calculate percentile for given array of values.
 *
 * @template T
 * @param {Number|Array<Number>} pOrPs - percentile or a list of percentiles
 * @param {Array<T>|Array<Number>|TypedArray} list - array of values
 * @param {function(T): Number} [fn] - optional function to extract a value from an array item
 *
 * @return {Number|T|Array<Number>|Array<T>}
 */
function percentile(pOrPs, list, fn) {
  var ps = Array.isArray(pOrPs) ? pOrPs : [pOrPs];
  var validationErrors = validateInput(ps);

  if (validationErrors.length) {
    throw new Error(validationErrors.join(' '));
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

  if (ps.length === 1) {
    return getPsValue(ps[0], list);
  }

  return ps.map(function (p) {
    return getPsValue(p, list);
  });
}

module.exports = percentile;
