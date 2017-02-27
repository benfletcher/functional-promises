function f(...x) {

  function f1(...y) {
    if (!y.length) {
      return x;
    }

    if (typeof y[0] === "function") {
      return f(x.map(y[0]))
    }

    return f(x.concat(y));
  }

  f1.toString = () =>
    Function.prototype.toString.call(f1).replace(/x/g, JSON.stringify(x));

  return f1;
}

const mult2 = (x) => (y) =>
  y ? mult2(x * y) : x;


// map(arr, )

const map = ({ arr, fn }) => arr.map(fn);
