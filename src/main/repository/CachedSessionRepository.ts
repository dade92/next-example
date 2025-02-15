import {SessionRepository} from "./SessionRepository";
import {Session} from "../../../data/session/Session";
import NodeCache from "node-cache";

const TTL = 600;

export class CachedSessionRepository {

    private delegate: SessionRepository;
    private cache: NodeCache;

    constructor(delegate: SessionRepository) {
        this.delegate = delegate;
        this.cache = new NodeCache({stdTTL: 600, checkperiod: 120});
    }

    async addSession(
        session: Session
    ): Promise<any> {
        return this.delegate.addSession(session);
    }

    async findSession(token: string): Promise<Session | null> {
        const cachedSession = this.cache.get(token) as Session;

        if (cachedSession) {
            return cachedSession
        } else {
            const session = await this.delegate.findSession(token);
            if (session) {
                this.cache.set(token, session, TTL);
                return Promise.resolve(session)
            } else {
                return Promise.reject();
            }
        }
    }

}