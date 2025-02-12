import {usersRepository} from "../repository/Configuration";
import {User} from "../../../data/users/User";

export const signupUseCase = async (user: User) => {
    const foundUser = await usersRepository.findUserByUsername(user.username);
    if (!foundUser) {
        usersRepository.addUser(user)
            .then(() => {
                return Promise.resolve();
            }).catch(e => {
                //TODO better error handling here
                console.log('Error adding user')
                return Promise.reject()
            });
    } else {
        console.log('User already existing');
        await Promise.reject()
    }
}