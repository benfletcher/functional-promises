const LZW = {
  compress(uncompressed) {
    let i;
    const dictionary = {};
    let c;
    let wc;
    let w = '';
    const result = [];
    let dictSize = 256;

    // for (i = 0; i < 256; i += 1) {
    //   dictionary[String.fromCharCode(i)] = i;
    // }

    for (i = 0; i < uncompressed.length; i += 1) {
      c = uncompressed.charAt(i);
      wc = w + c;

      // Do not use dictionary[wc] because javascript arrays
      // will return values for array['pop'], array['push'] etc
      // if (dictionary[wc]) {

      if (dictionary.hasOwnProperty(wc)) {     // eslint-disable-line
        w = wc;
      } else {
        result.push(dictionary[w]);
                // Add wc to the dictionary.
        dictionary[wc] = dictSize;
        dictSize += 1;
        w = String(c);
      }
    }

    // Output the code for w.
    if (w !== '') {
      result.push(dictionary[w]);
    }
    return result;
  },


  decompress(compressed) {
    let i;
    const dictionary = [];
    let w;
    let result;
    let k;
    let entry = '';
    let dictSize = 256;

    for (i = 0; i < 256; i += 1) {
      dictionary[i] = String.fromCharCode(i);
    }

    w = String.fromCharCode(compressed[0]);
    result = w;

    for (i = 1; i < compressed.length; i += 1) {
      k = compressed[i];
      if (dictionary[k]) {
        entry = dictionary[k];
      } else if (k === dictSize) {
        entry = w + w.charAt(0);
      } else {
        return null;
      }

      result += entry;

      // Add w+entry[0] to the dictionary.

      dictionary[dictSize] = w + entry.charAt(0);
      dictSize += 1;

      w = entry;
    }
    return result;
  }
};

// For Test Purposes
// const comp = LZW.compress('TOBEORNOTTOBEORTOBEORNOT');
// const decomp = LZW.decompress(comp);
//
// document.write(`${comp}<br>${decomp}`);
