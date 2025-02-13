import {sessionRepository} from "../repository/Configuration";
import {nowProvider} from "../utils/TimeProviders";

export const checkAuthTokenUseCase = async (token: string): Promise<boolean> =>
    sessionRepository.findSession(token)
        .then(session => {
            if (session) {
                return session.expirationDate > nowProvider();
            } else {
                return false;
            }
        }).catch(() => {
        return false
    })