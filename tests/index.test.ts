import { expect, describe, it } from '@jest/globals';
import { countTruthy, isChromium, parseUserAgent } from '../src/index';

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

// describe('parseUserAgent', () => {
//     test('should parse Chrome user agent', () => {
//         const result = parseUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
//         expect(result).toEqual({
//             browser: 'chrome',
//             version: '91'
//         });
//     });

//     test('should parse Firefox user agent', () => {
//         const result = parseUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0');
//         expect(result).toEqual({
//             browser: 'firefox',
//             version: '89'
//         });
//     });

//     test('should parse Safari user agent', () => {
//         const result = parseUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15');
//         expect(result).toEqual({
//             browser: 'safari',
//             version: '14'
//         });
//     });

//     test('should handle unknown user agent', () => {
//         const result = parseUserAgent('Unknown Browser');
//         expect(result).toEqual({
//             browser: '',
//             version: 0
//         });
//     });
// });

