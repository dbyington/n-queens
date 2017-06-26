'use strict';
const Console = console;

function calc (mx) {
  if (mx === 0) return 0;
  let q = 0;

  const pQ = (r = 1, c = 0, j = 0, n = 0) => {
    if (r > mx) {
      q++;
      // Console.log('Q!!!');
      return true;
    }
    // const pR = (c | j | n);
    // let mR = pR;
    let mR = (c | j | n);
    // // Console.log(`r: ${r}\tpR: ${mR.toString(2)}`);
    for (let s = 1; s <= mx; s++) {
      // // Console.log(`mR: ${mR.toString(2)}\tmR % 2: ${mR % 2}`);

      // // Console.log(`s: ${s}`);
      let mC, mJ, mN, oJ = 0;
      if (mR % 2 === 0) {
      // // Console.log(`Try row: ${r} column: ${s}, mR ${mR.toString(2)}, pR ${mR.toString(2)}`);
        mC = 1 << s-1;
        // Create our major
        // if our major will over run the length of our board
        // clip it off
        // // Console.log((1<<mx-1).toString(2));
        if (mC >= (1 << mx-1)) {
          mJ = 0;
        } else {
          mJ = mC << 1;
        }
        // check to see if the original major will run over
        oJ = j << 1;
        // Console.log(`mC: ${mC.toString(2)}  oJ: ${oJ.toString(2)}`);
        // // Console.log(`init oJ: ${oJ}`);

        // !!! this is the problem !!!
        if (oJ >= (1 << mx)) {
          oJ = oJ - (1<<mx);
        }
        // // Console.log(`add oJ: ${oJ}`);
        mJ = mJ | oJ;

        // create our minor from our column
        mN = mC >>> 1;
        let tmN = n >>> 1;
        mN = mN | (n >>> 1);
        mC = mC | c;
        // Console.log(`Column start: ${s.toString(2)}\tNew Colum: ${ (1 << s - 1).toString(2) }\tnew mC ${mC.toString(2)}`);

        // Console.log(`Major start: ${j.toString(2)}\tadjusted: ${oJ.toString(2)}\tNew Major: ${mJ.toString(2)}`);

        // Console.log(`Minor start: ${n.toString(2)}\tadjusted: ${tmN.toString(2)}\tNew Minor: ${mN.toString(2)}`);

        // Console.log(`Sending to row: ${r+1}  desc:${(mC|mJ|mN).toString(2)}\n`);

        pQ(r+1, mC, mJ, mN);
      }
      // mR = pR >>> s;
      mR = mR >>> 1;
    }
    // // Console.log(`Back to row ${r}`);
    return q;
  };

  return pQ();
}
const size = 10;
const st = Date.now()/1000;
const p = calc(size);
const end = Date.now()/1000;
Console.log(`Queens size ${size}: ${p} (in ${end - st} seconds)`);
module.exports = calc;
