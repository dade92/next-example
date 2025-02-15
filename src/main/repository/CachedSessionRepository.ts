import {SessionRepository} from "./SessionRepository";
import {Session} from "../../../data/session/Session";
import QuickLRU from 'quick-lru';

export class CachedSessionRepository {

    private delegate: SessionRepository;
    private cache: QuickLRU<string, Session>;

    constructor(delegate: SessionRepository) {
        this.delegate = delegate;
        this.cache = new QuickLRU({maxSize: 1000});
    }

    async findSession(token: string): Promise<Session | null> {
        const cachedSession = this.cache.get(token);

        if (cachedSession) {
            return cachedSession
        } else {
            const session = await this.delegate.findSession(token);
            if (session) {
                this.cache.set(token, session);
                return Promise.resolve(session)
            } else {
                return Promise.reject();
            }
        }
    }


}