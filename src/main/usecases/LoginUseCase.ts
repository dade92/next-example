import {sessionRepository, usersRepository} from "../repository/Configuration";
import {nowPlusOneDayProvider} from "../utils/TimeProviders";
import {randomSessionTokenGenerator} from "../utils/RandomSessionTokenGenerator";
import {hashWithSHA256} from "../utils/Crypto";

interface LoginResult {
    token: string;
    expirationDate: Date;
    username: string;
    email: string;
}

export const loginUseCase = async (username: string, password: string): Promise<LoginResult | null> => {
    const user = await usersRepository.findUserByUsername(username);

    if (user?.password == hashWithSHA256(password)) {
        const sessionToken = randomSessionTokenGenerator();
        const expirationDate = nowPlusOneDayProvider();

        await sessionRepository.addSession({
            username: username,
            sessionToken: sessionToken,
            expirationDate: expirationDate
        })
        return {
            token: sessionToken,
            expirationDate: expirationDate,
            username: username,
            email: user.email
        };
    } else {
        return null;
    }
}