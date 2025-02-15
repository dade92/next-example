import { signUpValidator } from '../../main/utils/SignUpValidator';

describe('validate', () => {
    it('should return true when all parameters are provided', () => {
        expect(signUpValidator('user', 'user@example.com', 'password')).toBe(true);
    });

    it('should return false when username is missing', () => {
        expect(signUpValidator('', 'user@example.com', 'password')).toBe(false);
    });

    it('should return false when email is missing', () => {
        expect(signUpValidator('user', '', 'password')).toBe(false);
    });

    it('should return false when password is missing', () => {
        expect(signUpValidator('user', 'user@example.com', '')).toBe(false);
    });

    it('should return false when all parameters are missing', () => {
        expect(signUpValidator('', '', '')).toBe(false);
    });

    it('should return false when email format is invalid', () => {
        expect(signUpValidator('user', 'invalid-email', 'password')).toBe(false);
    });
});