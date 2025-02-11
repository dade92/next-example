import {usersRepository} from "../repository/Configuration";
import {User} from "../../../data/users/User";

export const signupUseCase = async (user: User) => {
    //TODO handle the failures
    //TODO check that a user does not exist? Maybe in the upper use case
    const foundUser = await usersRepository.findUserByUsername(user.username);
    if (!foundUser) {
        await usersRepository.addUser(user);
        Promise.resolve();
    } else {
        console.log('User already existing');
        await Promise.reject()
    }
}