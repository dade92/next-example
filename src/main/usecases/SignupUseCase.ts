import {usersRepository} from "../repository/Configuration";
import {User} from "../../../data/users/User";

export enum SignupOutcome {
    SUCCESS = 'SUCCESS',
    USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
    ERROR = 'ERROR'
}

export interface SignupResult {
    outcome: SignupOutcome;
}

export const signupUseCase = async (user: User): Promise<SignupResult | null> => {
    const foundUser = await usersRepository.findUserByUsername(user.username);

    if (!foundUser) {
        return usersRepository.addUser(user)
            .then(() => {
                return {outcome: SignupOutcome.SUCCESS};
            }).catch(e => {
                //TODO better error handling here
                console.log('Error adding user')
                return null
            });
    } else {
        console.log('Error registering a new user. User already existing');
        return {outcome: SignupOutcome.USER_ALREADY_EXISTS};
    }
}