'use strict';
const Console = console;

function calc (mx) {
  if (mx === 0) return 0;
  let q = 0;

  const pQ = (r = 1, c = 0, j = 0, n = 0) => {
    if (r > mx) {
      q++;
      Console.log('Q!!!');
      return true;
    }
    const pR = (c | j | n);
    let mR = pR;
    Console.log(`r: ${r}\tpR: ${pR.toString(2)}`);
    // mC = mJ = mN = oJ = 0;
    for (let s = 1; s <= mx; s++) {
      let mC, mJ, mN, oJ;
      Console.log(`mR: ${mR.toString(2)}\tpR % 2: ${pR % 2}`);
      if (mR % 2 === 0) {
        Console.log(`Try row: ${r} column: ${s}`);
        mC = s | c;
        mJ = mC << 1;
        mN = mC >>> 1;
        if (s === mx) {
          mJ = 0;
        }
        oJ = j << 1;
        if (oJ > mx) {
          oJ -= mx;
        }
        mJ = mJ | oJ;
        mN = mN | n;
        Console.log(`Sending Row: ${r}\tmC: ${mC.toString(2)} \tmJ: ${mJ.toString(2)} \tmN: ${mN.toString(2)}`);
        pQ(r+1, mC, mJ, mN);
      }
      mR = pR >>> s;
    }
    Console.log(`Back to row ${r}`);
    return q;
  };

  return pQ();
}

Console.log(calc(6));

module.exports = calc;
