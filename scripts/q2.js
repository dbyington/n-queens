'use strict';
const Console = console;

function calc (boardSize) {
  if (boardSize === 0) return 0;
  let q = 0;

  const placeQueen = (depth = 1, row = 0, major = 0, minor = 0) => {
    if (depth > boardSize) {
      q++;
      // Console.log('Q!!!');
      return true;
    }
    // const pR = (c | j | n);
    // let mR = pR;
    let thisRow = (row | major | minor);
    // // Console.log(`r: ${r}\tpR: ${mR.toString(2)}`);
    for (let s = 1; s <= boardSize; s++) {
      // // Console.log(`mR: ${mR.toString(2)}\tmR % 2: ${mR % 2}`);

      // // Console.log(`s: ${s}`);
      let myRow, myMajor, myMinor, originalMajor = 0;
      if (thisRow % 2 === 0) {
      // // Console.log(`Try row: ${r} column: ${s}, mR ${mR.toString(2)}, pR ${mR.toString(2)}`);
        myRow = 1 << s-1;
        // Create our major
        // if our major will over run the length of our board
        // clip it off
        // // Console.log((1<<mx-1).toString(2));
        if (myRow >= (1 << boardSize-1)) {
          myMajor = 0;
        } else {
          myMajor = myRow << 1;
        }
        // check to see if the original major will run over
        originalMajor = major << 1;
        // Console.log(`mC: ${mC.toString(2)}  oJ: ${oJ.toString(2)}`);
        // // Console.log(`init oJ: ${oJ}`);

        // !!! this is the problem !!!
        if (originalMajor >= (1 << boardSize)) {
          originalMajor = originalMajor - (1<<boardSize);
        }
        // // Console.log(`add oJ: ${oJ}`);
        myMajor = myMajor | originalMajor;

        // create our minor from our column
        myMinor = myRow >>> 1;
        // let tmN = minor >>> 1;
        myMinor = myMinor | (minor >>> 1);
        myRow = myRow | row;
        // Console.log(`Column start: ${s.toString(2)}\tNew Colum: ${ (1 << s - 1).toString(2) }\tnew mC ${mC.toString(2)}`);

        // Console.log(`Major start: ${j.toString(2)}\tadjusted: ${oJ.toString(2)}\tNew Major: ${mJ.toString(2)}`);

        // Console.log(`Minor start: ${n.toString(2)}\tadjusted: ${tmN.toString(2)}\tNew Minor: ${mN.toString(2)}`);

        // Console.log(`Sending to row: ${r+1}  desc:${(mC|mJ|mN).toString(2)}\n`);

        placeQueen(depth+1, myRow, myMajor, myMinor);
      }
      // mR = pR >>> s;
      thisRow = thisRow >>> 1;
    }
    // // Console.log(`Back to row ${r}`);
    return q;
  };

  return placeQueen();
}
const size = 10;
const st = Date.now()/1000;
const p = calc(size);
const end = Date.now()/1000;
Console.log(`Queens size ${size}: ${p} (in ${end - st} seconds)`);
module.exports = calc;
