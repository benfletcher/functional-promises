'use strict'; // eslint-disable-line

const mult = x => y =>
  y ? mult(x * y) : x;

const _ = arr => function f(...x) {
  function __(...y) {
    return ((y.length) ? f(...x, ...y) : f(...x));
  }
  __.toString = () => JSON.stringify(x);
  __.then = () => x.reduce(arr);

  return __;
};

function lcm(x, y) {
  function gcd(xx, yy) {
    if (yy === 0) return xx;

    if (yy > xx) return gcd(yy, xx);

    return gcd(yy, xx % yy);
  }

  return (x / gcd(x, y)) * y;  // Euclid
}

const currify = fn => function doFn(x) {
  const inner = y => (y ? doFn(fn(x, y)) : x);
  inner.toString = () => `${fn.name}(${x})`;

  return inner;
};

const _lcm_ = currify(lcm);


const blob = new Blob([document.querySelector('#worker1').innerHTML]);

const worker = new Worker(window.URL.createObjectURL(blob));
worker.onmessage = e => console.log(e.data);
