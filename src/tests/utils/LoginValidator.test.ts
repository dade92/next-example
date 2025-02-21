import { loginValidator } from '../../main/utils/LoginValidator';

describe('loginValidator', () => {
    it('should return true when both username and password are provided', () => {
        expect(loginValidator('user', 'password')).toBe(true);
    });

    it('should return false when username is missing', () => {
        expect(loginValidator('', 'password')).toBe(false);
    });

    it('should return false when password is missing', () => {
        expect(loginValidator('user', '')).toBe(false);
    });

    it('should return false when both username and password are missing', () => {
        expect(loginValidator('', '')).toBe(false);
    });
});