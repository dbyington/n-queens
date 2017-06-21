'use strict';

function calc (size) {
  if (size === 0) return 0;
  const queen = new Queens(size);
  return queen.placeQueens();
}
class Queens {
  constructor (max) {
    this.max = max;
    this.placements = [];
    this.solutions = 0;
  }
  placeQueens () {
    this.tryPlace();
    return this.solutions;
  }
  tryPlace (depth = 0) {
    if (depth === this.max) {
      this.solutions++;
      return;
    }
    for (let c = 0; c < this.max; c++) {
      if (!this.placements.includes(c)) {
        let colAdjust = 1;
        let diag = false;
        for (let d = depth; d > 0; d--) {
          if (this.placements[d-1] === c - colAdjust || this.placements[d-1] === c + colAdjust++) diag = true;
        }
        if (!diag) {
          this.placements.push(c);
          this.tryPlace(depth+1);
          this.placements.pop();
        }
      }
    }
  }
}

module.exports = calc;
