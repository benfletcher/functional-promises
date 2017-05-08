/* global sampleJSON */

function compress(input) {
  const inpArr = input.split('').map(char => char.charCodeAt());
  const dict = new Set();
  let w = '';
  const result = [];

  inpArr.forEach((char) => {
    w += char;
    if (!dict.has(w)) {
      result.push(w);
      dict.add(w);
      w = '';
    }
  });

  if (w) { result.push(w); }
  dict.add(w);

  console.log(dict);
  return result;
}

console.log(compress('ababacab'));

function analyzeSample(data, num) {
  const chars = JSON.stringify(data).split('');
  const len = chars.length - num;

  const freq = new Map();

  const genDict = (charArr, width) =>
    charArr.map((_, i, arr) =>
      arr.slice(i, i + width).join('')
    );

  genDict(chars, num).forEach((char) => {
    if (freq.has(char)) {
      freq.set(char, freq.get(char) + 1);
    } else {
      freq.set(char, 1);
    }
  });

  let portion = 0;
  const sortedFreq = new Map(
    [...freq]
      .sort((a, b) => b[1] - a[1])
      .map((e) => {
        portion += e[1] / len;
        e[1] = portion;
        return e;
      })
      .filter(e => e[1] < 0.25)
  );

  return sortedFreq;
}

console.log(analyzeSample(sampleJSON, 2));
