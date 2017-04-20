function buildPipe(...fns) {
  return function piped(...arg) {
    switch (typeof arg[0]) {
      case 'function':
        return buildPipe(...fns, ...arg);
      case 'undefined':
        return fns;
      default:
        return fns.reduce((x, fn) => fn(x), arg[0]);
    }
  };
}

function progressivePipe(val) {
  return function pipe(...fns) {
    function piped(...args) {
      return (args[0])
        ? pipe(...fns, ...args)
        : fns.reduce((x, fn) => fn(x), val);
    }
    piped.toString = () => [`${val.toString()}:`, ...fns.map((fn) => {
      const func = fn.toString();
      const funcPrefix = (func.slice(0, 8) === 'function')
        ? ''
        : `function ${fn.name}: `;
      return funcPrefix + func;
    })].join('\n');
    return (fns[0])
      ? piped
      : val;
  };
}

function buildCompose(...fns) {
  return function piped(...arg) {
    switch (typeof arg[0]) {
      case 'function':
        return buildCompose(...fns, ...arg);
      case 'undefined':
        return fns;
      default:
        return fns.reduceRight((x, fn) => fn(x), arg[0]);
    }
  };
}

function doubler(x) { return x * 2; }
const plusOne = x => x + 1;
const squared = x => x ** x;
