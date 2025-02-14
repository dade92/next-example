import {signUpRequestToUserAdapter} from "../../main/adapters/SignUpRequestAdapter";
import {SignUpRequest} from "../../../pages/api/signup";
import {User} from "../../../data/users/User";
import {hashWithSHA256} from "../../main/utils/Crypto";

jest.mock('../../main/utils/Crypto', () => ({
    hashWithSHA256: jest.fn(),
}));

describe('signUpRequestToUserAdapter', () => {
    it('should correctly transform SignUpRequest to User', () => {
        const signUpRequest: SignUpRequest = {
            username: 'testUser',
            password: 'testPassword',
            email: 'test@example.com'
        };

        const hashedPassword = 'hashedPassword';
        (hashWithSHA256 as jest.Mock).mockReturnValue(hashedPassword);

        const expectedUser: User = {
            username: 'testUser',
            password: hashedPassword,
            email: 'test@example.com'
        };

        const result = signUpRequestToUserAdapter(signUpRequest);

        expect(result).toEqual(expectedUser);
        expect(hashWithSHA256).toHaveBeenCalledWith(signUpRequest.password);
    });
});