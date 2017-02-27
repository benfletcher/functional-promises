function f(...x) {
  function f1(...y) {
    if (!y.length) {
      return x;
    }

    if (typeof y[0] === 'function') {
      return f(x.map(y[0]));
    }

    return f(x.concat(y));
  }

  f1.toString = () =>
    Function.prototype.toString.call(f1).replace(/x/g, JSON.stringify(x));

  return f1;
}

const foo = f(1, 2, 3, 4, 5);
console.log(foo);
