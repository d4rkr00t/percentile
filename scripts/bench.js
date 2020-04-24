let Benchmark = require('benchmark');
let percentile = require('../lib');
let oldpercentile = require('./percentile-baseline');

function generateArray(length, fn) {
  return Array.apply(null, Array(length)).map(fn);
}

function generateArraySimple(length) {
  return generateArray(length, (v, i) => i + 1);
}

let suite1 = new Benchmark.Suite();
let suite2 = new Benchmark.Suite();
let suite3 = new Benchmark.Suite();

let arr10 = generateArraySimple(10);
let arr10k = generateArraySimple(10000);
let arr100k = generateArraySimple(100000);


suite1.add('Small Array – 10 items [old]', function () {
  oldpercentile(Math.floor(Math.random() * (100 - 1)), arr10);
})
.add('Small Array – 10 items [new]', function () {
  percentile(Math.floor(Math.random() * (100 - 1)), arr10);
})
.on('cycle', function (event) {
  console.log(String(event.target)); // eslint-disable-line
})
.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name')); // eslint-disable-line
})
.run();

suite2.add('Big array 10k values [old]', function () {
  oldpercentile(Math.floor(Math.random() * (100 - 1)), arr10k);
})
.add('Big array 10k values [new]', function () {
  percentile(Math.floor(Math.random() * (100 - 1)), arr10k);
})
.on('cycle', function (event) {
  console.log(String(event.target)); // eslint-disable-line
})
.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name')); // eslint-disable-line
})
.run();

suite3.add('Big array 100k values [old]', function () {
  oldpercentile(Math.floor(Math.random() * (100 - 1)), arr100k);
})
.add('Big array 100k values [new]', function () {
  percentile(Math.floor(Math.random() * (100 - 1)), arr100k);
})
.on('cycle', function (event) {
  console.log(String(event.target)); // eslint-disable-line
})
.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name')); // eslint-disable-line
})
.run();
