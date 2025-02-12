import {usersRepository} from "../repository/Configuration";

interface LoginResult {
    token: string;
}

export const loginUseCase = async (username: string, password: string): Promise<LoginResult | null> => {
    const user = await usersRepository.findUserByUsername(username);
    //TODO handle the hash
    if (user?.password == password) {
        return {
            token: 'XXX'
        };
    } else {
        return null;
    }
}