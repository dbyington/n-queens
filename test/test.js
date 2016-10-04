'use strict';

require('chai').should();

const rooks = require('../scripts/rooks.js');
const queens = require('../scripts/queens.js');

describe('Rooks', function () {

  it('should compute solutions for "n" rooks', function () {
    rooks(0).should.equal(0);
    rooks(1).should.equal(1);
    rooks(2).should.equal(2);
    rooks(3).should.equal(6);
    rooks(4).should.equal(24);
    rooks(5).should.equal(120);
    rooks(6).should.equal(720);
    rooks(7).should.equal(5040);
    rooks(8).should.equal(40320);
    rooks(9).should.equal(362880);
    rooks(10).should.equal(3628800);
  });

});

describe('Queens', function () {

  it('should compute solutions for "n" queens', function () {
    queens(0).should.equal(0);
    queens(1).should.equal(1);
    queens(2).should.equal(0);
    queens(3).should.equal(0);
    queens(4).should.equal(2);
    queens(5).should.equal(10);
    queens(6).should.equal(4);
    queens(7).should.equal(40);
    queens(8).should.equal(92);
    queens(9).should.equal(352);
    queens(10).should.equal(724);
  });

});
