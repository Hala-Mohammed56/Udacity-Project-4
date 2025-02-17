/**
 * @jest-environment jsdom
 */

import { checkForURL } from '../js/nameChecker';

describe('checkForURL function', () => {
    test('should return true for a valid URL with http', () => {
        expect(checkForURL('http://example.com')).toBe(true);
    });

    test('should return true for a valid URL with https', () => {
        expect(checkForURL('https://example.com')).toBe(true);
    });

    test('should return true for a valid URL with subdomain', () => {
        expect(checkForURL('https://sub.example.com')).toBe(true);
    });

    test('should return true for a valid URL with path', () => {
        expect(checkForURL('https://example.com/path')).toBe(true);
    });

    test('should return false for an invalid URL without protocol', () => {
        expect(checkForURL('example.com')).toBe(false);
    });

    test('should return false for an invalid URL with missing domain', () => {
        expect(checkForURL('http://')).toBe(false);
    });

    test('should return false for random text', () => {
        expect(checkForURL('randomtext')).toBe(false);
    });

    test('should return false for an empty string', () => {
        expect(checkForURL('')).toBe(false);
    });
});

test('The URL is valid', () => {
    expect(checkForURL("https://medium.com/javascript-scene/tdd-changed-my-life-5af0ce099f80")).toBeTruthy();
});

test('The URL is invalid', () => {
    expect(checkForURL("Invalid URL")).toBeFalsy();
});
