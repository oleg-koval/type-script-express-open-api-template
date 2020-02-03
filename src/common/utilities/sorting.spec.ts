import { sortAscending, sortDescending } from './sorting';
describe('sort array descending', (): void => {
  describe('error handling', (): void => {});

  describe('data persistance', (): void => {
    it('sorts an array in descending order', (): void => {
      expect.assertions(1);

      expect(sortDescending([3, 1, 4, 5])).toMatchInlineSnapshot(`
        Array [
          5,
          4,
          3,
          1,
        ]
      `);
    });

    it('returns an empty array if input is an empty array', (): void => {
      expect.assertions(1);

      expect(sortDescending([])).toMatchInlineSnapshot(`Array []`);
    });
  });
});

describe('sort array ascending', (): void => {
  describe('error handling', (): void => {});

  describe('data persistance', (): void => {
    it('sorts an array in ascending order', (): void => {
      expect.assertions(1);

      expect(sortAscending([3, 1, 4, 5])).toMatchInlineSnapshot(`
        Array [
          1,
          3,
          4,
          5,
        ]
      `);
    });

    it('returns an empty array if input is an empty array', (): void => {
      expect.assertions(1);

      expect(sortDescending([])).toMatchInlineSnapshot(`Array []`);
    });
  });
});
