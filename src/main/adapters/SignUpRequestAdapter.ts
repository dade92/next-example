import {User} from "../../../data/users/User";
import {SignUpRequest} from "../../../pages/api/signup";
import {hashWithSHA256} from "../utils/Crypto";

export const signUpRequestToUserAdapter = (signUpRequest: SignUpRequest): User => ({
    username: signUpRequest.username,
    password: hashWithSHA256(signUpRequest.password),
    email: signUpRequest.email,
})