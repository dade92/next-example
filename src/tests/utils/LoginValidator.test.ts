import { loginValidator } from '../../main/utils/LoginValidator';

describe('loginValidator', () => {
    const username = 'user';
    const password = 'password';

    it('should return true when both username and password are provided', () => {
        expect(loginValidator(username, password)).toBe(true);
    });

    it('should return false when username is missing', () => {
        expect(loginValidator('', password)).toBe(false);
    });

    it('should return false when password is missing', () => {
        expect(loginValidator(username, '')).toBe(false);
    });

    it('should return false when both username and password are missing', () => {
        expect(loginValidator('', '')).toBe(false);
    });
});