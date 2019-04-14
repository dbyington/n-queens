'use strict';
const Console = console;

function calc (mx) {
  if (mx === 0) return 0;
  let q = 0;

  const pQ = (r = 1, c = 0, j = 0, n = 0) => {
    if (r > mx) {
      q++;
      return true;
    }

    let mR = (c | j | n);
    for (let s = 1; s <= mx; s++) {

      let mC, mJ, mN, oJ = 0;
      if (mR % 2 === 0) {

        mC = 1 << s-1;
        // Create our major
        // if our major will over run the length of our board
        // clip it off
        if (mC >= (1 << mx-1)) {
          mJ = 0;
        } else {
          mJ = mC << 1;
        }
        // check to see if the original major will run over
        oJ = j << 1;

        if (oJ >= (1 << mx)) {
          oJ = oJ - (1<<mx);
        }
        mJ = mJ | oJ;

        // create our minor from our column
        mN = mC >>> 1;
        mN = mN | (n >>> 1);
        mC = mC | c;

        pQ(r+1, mC, mJ, mN);
      }
      mR = mR >>> 1;
    }
    return q;
  };
  return pQ();
}

const size = 10;
const st = Date.now();
const p = calc(size);
const end = Date.now();
Console.log(`Queens size ${size}: ${p} (in ${(end - st)/1000} seconds)`);

module.exports = calc;
