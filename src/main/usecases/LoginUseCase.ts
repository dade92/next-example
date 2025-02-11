import {usersRepository} from "../repository/Configuration";

export const loginUseCase = async (username: string, password: string): Promise<boolean> => {
    const user = await usersRepository.findUserByUsername(username);
    //TODO handle the hash
    return user?.password == password
}