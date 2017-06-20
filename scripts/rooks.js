'use strict';

function calc (size) {
  if (size === 0) return 0;
  const rookBoard = new Rooks(size);
  return rookBoard.placeRooks();
}

class Rooks {
  constructor (size) {
    this.max = size;
    this.colsUsed = [];
    this.solutionsFound = 0;
  }
  placeRooks () {
    this.decend();
    return this.solutionsFound;
  }
  decend (depth=0) {
    if (depth === this.max) {
      // solution
      this.solutionsFound++;
      return true;
    }

    for (let i = 0; i < this.max; i++) {
      if (!this.colsUsed.includes(i)) {
        this.colsUsed.push(i);
        this.decend(depth+1);
        this.colsUsed.pop();
      }
    }
  }

}

module.exports = calc;
