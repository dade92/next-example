import { hashWithSHA256 } from '../../main/utils/Crypto';

describe('hashWithSHA256', () => {
    it('should return the correct SHA-256 hash for a given string', () => {
        const data = 'test';
        const expected = '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08';

        expect(hashWithSHA256(data)).toBe(expected);
    });

    it('should return the correct SHA-256 hash for an empty string', () => {
        const data = '';
        const expected = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

        expect(hashWithSHA256(data)).toBe(expected);
    });
});