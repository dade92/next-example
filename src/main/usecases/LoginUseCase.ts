import {sessionRepository, usersRepository} from "../repository/Configuration";
import {nowPlusOneHourProvider} from "../utils/NowProvider";

interface LoginResult {
    token: string;
}

export const loginUseCase = async (username: string, password: string): Promise<LoginResult | null> => {
    const user = await usersRepository.findUserByUsername(username);
    const sessionToken = 'XXX';

    //TODO handle the hash
    if (user?.password == password) {
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