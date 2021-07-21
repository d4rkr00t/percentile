export = percentile;
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
declare function percentile<T>(pOrPs: number | Array<number>, list: number[] | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | T[], fn?: (arg0: T) => number): number | number[] | T | T[];
