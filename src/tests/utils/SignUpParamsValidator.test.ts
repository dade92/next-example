import { validate } from '../../main/utils/SignUpParamsValidator';

describe('validate', () => {
    it('should return true when all parameters are provided', () => {
        expect(validate('user', 'user@example.com', 'password')).toBe(true);
    });

    it('should return false when username is missing', () => {
        expect(validate('', 'user@example.com', 'password')).toBe(false);
    });

    it('should return false when email is missing', () => {
        expect(validate('user', '', 'password')).toBe(false);
    });

    it('should return false when password is missing', () => {
        expect(validate('user', 'user@example.com', '')).toBe(false);
    });

    it('should return false when all parameters are missing', () => {
        expect(validate('', '', '')).toBe(false);
    });

    it('should return false when email format is invalid', () => {
        expect(validate('user', 'invalid-email', 'password')).toBe(false);
    });
});