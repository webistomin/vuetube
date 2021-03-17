import { isFunction, toType } from '@/helpers/inspect';

describe('inspect.ts', () => {
  describe.each`
    value | expected
    ${1}  | ${false}
    ${''}  | ${false}
    ${null}  | ${false}
    ${undefined}  | ${false}
    ${function test() {}}  | ${true}
    ${() => {}}  | ${true}
  `('isFunction', ({ value, expected }) => {
    it(`works with ${typeof value}`, () => {
      const result = isFunction(value);
      expect(result).toEqual(expected);
    });
  });

  describe.each`
    value | expected
    ${1}  | ${'number'}
    ${''}  | ${'string'}
    ${null}  | ${'object'}
    ${undefined}  | ${'undefined'}
    ${function test() {}}  | ${'function'}
    ${() => {}}  | ${'function'}
  `('toType', ({ value, expected }) => {
    it(`works with ${typeof value}`, () => {
      const result = toType(value);
      expect(result).toEqual(expected);
    });
  });
});
