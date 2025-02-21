import {signUpValidator} from '../../main/utils/SignUpValidator';

describe('validate', () => {
    const username = 'user';
    const email = 'user@example.com';
    const correctPassword = 'password';
    const invalidEmail = 'invalid-email';
    const invalidPassword = 'passwor';

    it('should return true when all parameters are provided and meet requirements', () => {
        expect(signUpValidator(username, email, correctPassword)).toBe(true);
    });

    it('should return false when username is missing', () => {
        expect(signUpValidator('', email, correctPassword)).toBe(false);
    });

    it('should return false when email is missing', () => {
        expect(signUpValidator(username, '', correctPassword)).toBe(false);
    });

    it('should return false when password is missing', () => {
        expect(signUpValidator(username, email, '')).toBe(false);
    });

    it('should return false when password is less than 8 chars', () => {
        expect(signUpValidator(username, email, invalidPassword)).toBe(false);
    });

    it('should return false when all parameters are missing', () => {
        expect(signUpValidator('', '', '')).toBe(false);
    });
    it('should return false when email format is invalid', () => {
        expect(signUpValidator(username, invalidEmail, correctPassword)).toBe(false);
    });
});