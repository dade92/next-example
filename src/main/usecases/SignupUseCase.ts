import {usersRepository} from "../repository/Configuration";

export const signupUseCase = (
    username: string,
    password: string,
    email: string
) => {
    //TODO handle the failures
    //TODO check that a user does not exist? Maybe in the upper use case
    usersRepository.addUser(username, password, email)
}