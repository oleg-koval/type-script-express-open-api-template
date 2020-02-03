/**
 * Sorts array of numbers descending.
 */
export const sortDescending = (array: number[]): number[] =>
  array.sort((left: number, right: number): number => right - left);

/**
 * * Sorts array of numbers ascending.
 */
export const sortAscending = (array: number[]): number[] =>
  array.sort((left: number, right: number): number => left - right);
