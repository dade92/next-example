import {sessionRepository, usersRepository} from "../repository/Configuration";
import {nowPlusOneHourProvider} from "../utils/NowProvider";
import {randomSessionTokenGenerator} from "../utils/RandomSessionTokenGenerator";
import {hashWithSHA256} from "../utils/Crypto";

interface LoginResult {
    token: string;
}

export const loginUseCase = async (username: string, password: string): Promise<LoginResult | null> => {
    const user = await usersRepository.findUserByUsername(username);

    if (user?.password == hashWithSHA256(password)) {
        const sessionToken = randomSessionTokenGenerator();
        await sessionRepository.addSession({
            username: username,
            sessionToken: sessionToken,
            expirationDate: nowPlusOneHourProvider()
        })
        return {
            token: sessionToken
        };
    } else {
        return null;
    }
}