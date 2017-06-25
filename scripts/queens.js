'use strict';
const Console = console;

function calc (size) {
  if (size === 0) return 0;
  const queen = new Queens(size);
  return queen.placeQueens();
}
class Queens {
  constructor (max) {
    this.max = max;
    this.solutions = 0;
  }
  placeQueens () {
    Console.log('=====================START========================');
    this.tryPlace();
    Console.log('======================END==========================');
    return this.solutions;
  }
  tryPlace (row = 1, column = 0, major = 0, minor = 0) {
    if (row > this.max) {
      this.solutions++;
      Console.log('SOLUTION!:',this.solutions,'(',column.toString(2),major.toString(2),minor.toString(2),')');
      return;
    }
    let takenAbove = Array.from((column | major | minor).toString(2)).reverse().slice(0,this.max);
    // let openSpaces = (~takenAbove) >>> 0);
    // if (row === 1) {
    //   let c = column | 1;
    //   let mj = c << 1;
    //   let mn = c >>> 1
    //   Console.log((mj).toString(2));
    //   Console.log('row:',row,'\ttakenAbove:',takenAbove,'\topenSpaces:',openSpaces.toString(2));
    //   this.tryPlace(row + 1, c, mj, mn);
    // }
    // //let openSpaces = (notTaken | parseInt('1'.repeat(this.max),2));
    // if (openSpaces) { // > 1, there are open spaces
    //   Console.log('There are spaces:');
    //   let c = column | 1;
    //   let mj = c << 1;
    //   let mn = c >>> 1
    //   if (openSpaces % 2) { // it's odd, so column 1 is free
    //     this.tryPlace(row + 1, c | 1, mj | (major << 1), mn | (minor >>> 1));
    //   }
      // if it's not odd, count up in binary to the max size and if the openSpaces is evenly divisible by tryColumn thats a space
    // let tryColumn = 2;
    Console.log('ROW:',row,'\ttakenAbove:',takenAbove); //,'\topenSpaces:',openSpaces.toString(2));
    // for (let tryColumn = this.max; tryColumn > 0; tryColumn++) {
      // Console.log('trying column:',tryColumn,openSpaces%tryColumn);
    for (let i = 0; i < this.max; i++) {
      Console.log('for: i',i);
      if (!takenAbove || takenAbove[i] === 0) {
        Console.log('Row',row,'Column',i,'is free.', takenAbove.toString(2));
        let c = (1 << i) | column;
        let mj = i << 1;
        if (c < this.max - 1) {
          mj = (1 << i << 1);
        }
        if (major << 1 < this.max) {
          mj = mj | (major << 1) ;
        }
        let mn = (c >>> 1) | (minor >>> 1);
        Console.log('row',row,'descriptor: columns:',
         c.toString(2),
          '\tmajor:',mj.toString(2),
          '\tminor',mn.toString(2));

        this.tryPlace(row + 1, c, mj, mn);
      } else {
        // Console.log('NOPE column:',tryColumn);
      }
      if (row === 1) Console.log('\n\n////////////////  back at row 1 \\\\\\\\\\\\\\\\\\\\\\\\');
      // Console.log('Back at row:',row,'column:',tryColumn+1);
    }
  // }
  }

}
Console.log(calc(5));

module.exports = calc;
