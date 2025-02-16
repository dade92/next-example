import {sessionRepository, usersRepository} from "../../main/repository/Configuration";
import {hashWithSHA256} from "../../main/utils/Crypto";
import {randomSessionTokenGenerator} from "../../main/utils/RandomSessionTokenGenerator";
import {nowPlusOneDayProvider} from "../../main/utils/TimeProviders";
import {loginUseCase} from "../../main/usecases/LoginUseCase";
import {Builder} from "builder-pattern";
import {User} from "../../../data/users/User";

jest.mock("../../main/repository/Configuration", () => ({
    usersRepository: {
        findUserByUsername: jest.fn(),
    },
    sessionRepository: {
        addSession: jest.fn(),
    },
}));

jest.mock("../../main/utils/Crypto", () => ({
    hashWithSHA256: jest.fn(),
}));

jest.mock("../../main/utils/RandomSessionTokenGenerator", () => ({
    randomSessionTokenGenerator: jest.fn(),
}));

jest.mock("../../main/utils/TimeProviders", () => ({
    nowPlusOneDayProvider: jest.fn(),
}));

describe("loginUseCase", () => {
    const username = "testUser";
    const password = "testPassword";
    const hashedPassword = "hashedPassword";
    const sessionToken = "randomToken";
    const expirationDate = new Date();

    (hashWithSHA256 as jest.Mock).mockReturnValue(hashedPassword);

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return a token if username and password are correct", async () => {
        const foundUser = Builder<User>().username(username).password(hashedPassword).build();

        (usersRepository.findUserByUsername as jest.Mock).mockResolvedValue(foundUser);
        (randomSessionTokenGenerator as jest.Mock).mockReturnValue(sessionToken);
        (nowPlusOneDayProvider as jest.Mock).mockReturnValue(expirationDate);

        const result = await loginUseCase(username, password);

        expect(result).toEqual({token: sessionToken, expirationDate: expirationDate, username: username});
        expect(usersRepository.findUserByUsername).toHaveBeenCalledWith(username);
        expect(hashWithSHA256).toHaveBeenCalledWith(password);
        expect(randomSessionTokenGenerator).toHaveBeenCalled();
        expect(nowPlusOneDayProvider).toHaveBeenCalled();
        expect(sessionRepository.addSession).toHaveBeenCalledWith({
            username,
            sessionToken,
            expirationDate,
        });
    });

    it("should return null if username is not found", async () => {
        (usersRepository.findUserByUsername as jest.Mock).mockResolvedValue(null);

        const result = await loginUseCase(username, password);

        expect(result).toBeNull();

        expect(usersRepository.findUserByUsername).toHaveBeenCalledWith(username);
        expect(hashWithSHA256).toHaveBeenCalledWith(password);

        expect(randomSessionTokenGenerator).not.toHaveBeenCalled();
        expect(nowPlusOneDayProvider).not.toHaveBeenCalled();
        expect(sessionRepository.addSession).not.toHaveBeenCalled();
    });

    it("should return null if password is incorrect", async () => {
        const user = Builder<User>().username(username).password("anotherPassword").build();

        (usersRepository.findUserByUsername as jest.Mock).mockResolvedValue(user);

        const result = await loginUseCase(username, password);

        expect(result).toBeNull();
        expect(usersRepository.findUserByUsername).toHaveBeenCalledWith(username);
        expect(hashWithSHA256).toHaveBeenCalledWith(password);

        expect(randomSessionTokenGenerator).not.toHaveBeenCalled();
        expect(nowPlusOneDayProvider).not.toHaveBeenCalled();
        expect(sessionRepository.addSession).not.toHaveBeenCalled();
    });
});