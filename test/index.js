import test from 'ava';
import percentile from '../lib';

function generateArray(length, fn) {
  return Array.apply(null, Array(length)).map(fn);
}

function generateArraySimple(length) {
  return generateArray(length, (v, i) => i + 1);
}

function generateArrayOfObject(length) {
  return generateArray(length, (v, i) => ({ val: i + 1 }));
}

function shuffleArray(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

const stubsSimple = [
  { percentile: 0, list: shuffleArray(generateArraySimple(100)), result: 1 },
  { percentile: 25, list: shuffleArray(generateArraySimple(100)), result: 25 },
  { percentile: 50, list: shuffleArray(generateArraySimple(100)), result: 50 },
  { percentile: 75, list: shuffleArray(generateArraySimple(100)), result: 75 },
  { percentile: 100, list: shuffleArray(generateArraySimple(100)), result: 100 },

  { percentile: 75, list: [NaN, NaN, 1, 100], result: 1 },
  { percentile: 75, list: [1, 100, NaN, NaN], result: 1 },
  { percentile: 75, list: shuffleArray([].concat(generateArraySimple(100), generateArraySimple(30))), result: 68 }
];

const stubsObject = [
  { percentile: 0, list: shuffleArray(generateArrayOfObject(100)), result: 1 },
  { percentile: 25, list: shuffleArray(generateArrayOfObject(100)), result: 25 },
  { percentile: 50, list: shuffleArray(generateArrayOfObject(100)), result: 50 },
  { percentile: 75, list: shuffleArray(generateArrayOfObject(100)), result: 75 },
  { percentile: 100, list: shuffleArray(generateArrayOfObject(100)), result: 100 },

  { percentile: 75, list: shuffleArray([].concat(generateArrayOfObject(100), generateArrayOfObject(30))), result: 68 }
];

test('percentile simple values', t => {
  stubsSimple.forEach(stub => {
    t.is(
      percentile(stub.percentile, stub.list),
      stub.result
    );
  });
});

test('percentile values in object', t => {
  stubsObject.forEach(stub => {
    t.is(
      percentile(stub.percentile, stub.list, item => item.val).val,
      stub.result
    );
  });
});

test('throw an error if NaN', t => {
  t.throws(() => {
    percentile(undefined) // eslint-disable-line
  }, Error);
});

test('throw an error if less than 0', t => {
  t.throws(() => {
    percentile(-1) // eslint-disable-line
  }, Error);
});

test('throw an error if grater than 100', t => {
  t.throws(() => {
    percentile(101) // eslint-disable-line
  }, Error);
});
