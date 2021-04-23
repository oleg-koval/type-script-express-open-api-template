/**
 * Sorts array of numbers descending.
 */
export const sortAscending = (array: readonly number[]): readonly number[] =>
  array.concat().sort();

/**
 * * Sorts array of numbers ascending.
 */
export const sortDescending = (array: readonly number[]): readonly number[] =>
  [...sortAscending(array)].reverse();
