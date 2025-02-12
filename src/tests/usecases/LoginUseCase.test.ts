import {sessionRepository, usersRepository} from "../../main/repository/Configuration";
import {hashWithSHA256} from "../../main/utils/Crypto";
import {randomSessionTokenGenerator} from "../../main/utils/RandomSessionTokenGenerator";
import {nowPlusOneHourProvider} from "../../main/utils/NowProvider";
import {loginUseCase} from "../../main/usecases/LoginUseCase";

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

jest.mock("../../main/utils/NowProvider", () => ({
    nowPlusOneHourProvider: jest.fn(),
}));

describe("loginUseCase", () => {
    const username = "testUser";
    const password = "testPassword";
    const hashedPassword = "hashedPassword";
    const sessionToken = "randomToken";
    const expirationDate = new Date();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return a token if username and password are correct", async () => {
        const user = {username, password: hashedPassword};

        (usersRepository.findUserByUsername as jest.Mock).mockResolvedValue(user);
        (hashWithSHA256 as jest.Mock).mockReturnValue(hashedPassword);
        (randomSessionTokenGenerator as jest.Mock).mockReturnValue(sessionToken);
        (nowPlusOneHourProvider as jest.Mock).mockReturnValue(expirationDate);

        const result = await loginUseCase(username, password);

        expect(result).toEqual({token: sessionToken});
        expect(usersRepository.findUserByUsername).toHaveBeenCalledWith(username);
        expect(hashWithSHA256).toHaveBeenCalledWith(password);
        expect(randomSessionTokenGenerator).toHaveBeenCalled();
        expect(nowPlusOneHourProvider).toHaveBeenCalled();
        expect(sessionRepository.addSession).toHaveBeenCalledWith({
            username,
            sessionToken,
            expirationDate,
        });
    });

    it("should return null if username is not found", async () => {
        (usersRepository.findUserByUsername as jest.Mock).mockResolvedValue(null);
        //TODO should I call the password hasher?
        (hashWithSHA256 as jest.Mock).mockReturnValue(hashedPassword);

        const result = await loginUseCase(username, password);

        expect(result).toBeNull();
        expect(usersRepository.findUserByUsername).toHaveBeenCalledWith(username);
        expect(hashWithSHA256).toHaveBeenCalledWith(password);
        expect(randomSessionTokenGenerator).not.toHaveBeenCalled();
        expect(nowPlusOneHourProvider).not.toHaveBeenCalled();
        expect(sessionRepository.addSession).not.toHaveBeenCalled();
    });

    it("should return null if password is incorrect", async () => {
        const user = {username, password: "differentHashedPassword"};

        (usersRepository.findUserByUsername as jest.Mock).mockResolvedValue(user);
        (hashWithSHA256 as jest.Mock).mockReturnValue(hashedPassword);

        const result = await loginUseCase(username, password);

        expect(result).toBeNull();
        expect(usersRepository.findUserByUsername).toHaveBeenCalledWith(username);
        expect(hashWithSHA256).toHaveBeenCalledWith(password);
        expect(randomSessionTokenGenerator).not.toHaveBeenCalled();
        expect(nowPlusOneHourProvider).not.toHaveBeenCalled();
        expect(sessionRepository.addSession).not.toHaveBeenCalled();
    });
});