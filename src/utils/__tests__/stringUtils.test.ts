import { stringUtils } from '../stringUtils';

describe('stringUtils', () => {
  describe('formatFirstLetter', () => {
    const fn = stringUtils.formatFirstLetter;
    it('should format the first letter of a string', () => {
      expect(fn('hello')).toBe('Hello');
      expect(fn('HELLO')).toBe('Hello');
      expect(fn('hello world')).toBe('Hello World');
      expect(fn('HELLO WORLD')).toBe('Hello World');
      expect(fn('hello World')).toBe('Hello World');
    });

    it('should format trailing spaces', () => {
      expect(fn(' hello world')).toBe('Hello World');
      expect(fn('hello world ')).toBe('Hello World');
      expect(fn(' hello world ')).toBe('Hello World');
    });
  });
});
