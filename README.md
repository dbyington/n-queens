# Coding queens

It’s about time for a serious algorithmic challenge! You’ll need to find an answer to the following question, without looking for any solution online:

*Given a chessboard of `n` size, in how many different ways can you place `n` queens such that none of them attack each other?*

Start analyzing a simpler version of the problem:

1. Given a chessboard of `n` size, how can you place `n` rooks such that none of them attack each other?
2. Given a chessboard of `n` size, in how many different ways can you place `n` rooks such that none of them attack each other?

Once you have figured these answers out, go back to the original question and complete the exercise. Finally write your algorithm’s space (i.e. memory) and time (i.e. computations) complexity in the comments.

## Notes

You can run into questions like this (but easier) during some job interviews, and during your day-to-day work. So, consider this exercise as a playground for understanding how to approach them.

When you’re dealing with complex problems, it’s always a good idea to:

- Start analyzing the simplest possible cases.
- Visualize your data well (possibly with the help of a whiteboard).
- Analyze what happens when the complexity increases.

Only once you have some ideas on how to proceed, start coding a possible solution, switching back and forth with your notes to re-evaluate assumptions.

## Getting started

To install the required dependencies run `npm install` .

Your algorithms are stored as separate files in the `scripts` folder.

## Extra credits

- Implement a solution that leverages [bitwise](https://en.wikipedia.org/wiki/Bitwise_operation) operations.
- Profile the memory usage and execution time of the bitwise version against the regular one.
- Pick any challenges you find interesting on [Project Euler](https://projecteuler.net/). For each working solution you implement, indicate the algorithm’s space and time complexity.
