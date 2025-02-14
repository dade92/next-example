import {usersRepository} from "../../main/repository/Configuration";
import {SignupOutcome, signupUseCase} from "../../main/usecases/SignupUseCase";
import {User} from "../../../data/users/User";
import {Builder} from "builder-pattern";

jest.mock('../../main/repository/Configuration', () => ({
    usersRepository: {
        findUserByUsername: jest.fn(),
        addUser: jest.fn(),
    },
}));

describe('signupUseCase', () => {
    const user: User = Builder<User>()
        .username('username')
        .password('XXX')
        .email('email')
        .build();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return SUCCESS when user does not exist and is added successfully', async () => {
        (usersRepository.findUserByUsername as jest.Mock).mockResolvedValue(null);
        (usersRepository.addUser as jest.Mock).mockResolvedValue(undefined);

        const result = await signupUseCase(user);

        expect(result).toEqual({outcome: SignupOutcome.SUCCESS});
        expect(usersRepository.findUserByUsername).toHaveBeenCalledWith(user.username);
        expect(usersRepository.addUser).toHaveBeenCalledWith(user);
    });

    it('should return USER_ALREADY_EXISTS when the user already exists', async () => {
        (usersRepository.findUserByUsername as jest.Mock).mockResolvedValue(user);

        const result = await signupUseCase(user);

        expect(result).toEqual({outcome: SignupOutcome.USER_ALREADY_EXISTS});
        expect(usersRepository.findUserByUsername).toHaveBeenCalledWith(user.username);
        expect(usersRepository.addUser).not.toHaveBeenCalled();
    });

    it('should return null if addUser throws an error', async () => {
        (usersRepository.findUserByUsername as jest.Mock).mockResolvedValue(null);
        (usersRepository.addUser as jest.Mock).mockRejectedValue(new Error('Database error'));

        const result = await signupUseCase(user);

        expect(result).toBeNull();
        expect(usersRepository.findUserByUsername).toHaveBeenCalledWith(user.username);
        expect(usersRepository.addUser).toHaveBeenCalledWith(user);
    });
});
