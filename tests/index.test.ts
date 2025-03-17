import { expect, describe, it } from '@jest/globals';
import { countTruthy } from '../src/index';

describe('countTruthy', () => {
    test('should return 0 for empty array', () => {
        expect(countTruthy([])).toBe(0);
    });

    test('should return 0 for array with all false values', () => {
        expect(countTruthy([false, false, false])).toBe(0);
    });

    test('should return correct count for array with all true values', () => {
        expect(countTruthy([true, true, true])).toBe(3);
    });

    test('should return correct count for mixed boolean values', () => {
        expect(countTruthy([true, false, true, false, true])).toBe(3);
    });
});
