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
  var kIndex = Math.ceil(list.length * (p / 100));

  list = list.sort(function (a, b) {
    if (fn) {
      a = fn(a);
      b = fn(b);
    }

    if (a > b) return 1;
    if (a < b) return -1;

    return 0;
  });

  return list[kIndex - 1];
}

module.exports = percentile;
