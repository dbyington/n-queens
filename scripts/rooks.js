'use strict';

function calc (size) {
  const rookBoard = new Rooks(size);
  rookBoard.placeRooks();
}

class Rook {
  constructor (n,x,y) {
    this.num = n;
    this.point = {x: x, y: y};
  }
}

class Rooks {
  constructor (size) {
    this.size = size;
    this.rookCount = 0;
    this.solutions = [];
    this.iterations = Math.pow(this.size,this.size);
    this.placements = 0;
    this._initializeMatrix();
  }
  _initializeMatrix () {
    let mx = [];
    mx.push([]);
    for (let i = 0; i < this.size; i++) {
      mx[i] = new Array(this.size);
    }
    this.matrix = mx;

  }

  placeRooks () {
    let i = 0;
    let x, y;
    while (i < this.iterations || this.solutions.length < this.size) {


      [x,y] = this.findFree(i++);

      if (this.matrix[x][y]) {
        this._initializeMatrix();
        i++;
      }
      this.placements++;
      this.fillMatrix(i,x,y);

    }
  }
  fillMatrix (n,x,y) {

    this.fillX(n,x);
    this.fillY(n,y);
  }
  fillX (n, x) {
    // this.matrix[x].fill(n);
    for (let i = 0; i < this.size; i++)
      this.matrix[x][i] = (!this.matrix[x][i]) ? n : this.matrix[x][i];
  }
  fillY (n, y) {
    for (let i = 0; i < this.size; i++)
      this.matrix[i][y] = (!this.matrix[i][y]) ? n : this.matrix[i][y];
  }
  findFree (i) {

    for (let x = i; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {

        if (!this.matrix[x][y]) return [x,y];
      }

    }
    this.checkSolution();
  }
  checkSolution () {

    if (this.placements >= this.size) {
      this.placements = 0;
      if (!this.solutions.includes(JSON.stringify(this.matrix))) {
        this.solutions.push(JSON.stringify(this.matrix));

      }
    }
  }
}

module.exports = calc;

calc(3);
