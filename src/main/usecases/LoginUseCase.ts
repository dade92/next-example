import {usersRepository} from "../repository/Configuration";

export const loginUseCase = (username: string, password: string) => {
    usersRepository.findUserByUsername(username)
}