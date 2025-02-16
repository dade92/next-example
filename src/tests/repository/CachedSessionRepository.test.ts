import NodeCache from "node-cache";
import {CachedSessionRepository} from "../../main/repository/CachedSessionRepository";
import {SessionRepository} from "../../main/repository/SessionRepository";
import {Builder} from "builder-pattern";
import {Session} from "../../../data/session/Session";
import {nowProvider} from "../../main/utils/TimeProviders";

jest.mock("node-cache");

jest.mock('../../main/utils/TimeProviders', () => ({
    nowProvider: jest.fn(),
}));

describe("CachedSessionRepository", () => {
    const NOW = new Date(2025, 2, 1);
    const SESSION_EXPIRATION_DATE = new Date(2025, 3, 1);
    const DATE_IN_THE_PAST = new Date(2025, 1, 1);

    let cachedSessionRepository: CachedSessionRepository;

    let delegate: jest.Mocked<SessionRepository>;
    let cache: jest.Mocked<NodeCache>;

    const sessionToken = 'token';
    const session: Session = Builder<Session>()
        .sessionToken(sessionToken)
        .username('username')
        .expirationDate(SESSION_EXPIRATION_DATE)
        .build();

    beforeEach(() => {
        delegate = {
            addSession: jest.fn(),
            findSession: jest.fn(),
        } as unknown as jest.Mocked<SessionRepository>;

        cache = new NodeCache() as jest.Mocked<NodeCache>;
        (NodeCache as unknown as jest.Mock).mockImplementation(() => cache);
        (nowProvider as jest.Mock).mockReturnValue(NOW);

        cachedSessionRepository = new CachedSessionRepository(delegate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call the delegate when adding a new session", async () => {
        delegate.addSession.mockResolvedValueOnce(session);

        await cachedSessionRepository.addSession(session);

        expect(delegate.addSession).toHaveBeenCalledWith(session);
    });

    it("should return session from cache if available and not expired", async () => {
        cache.get.mockReturnValueOnce(session);

        const result = await cachedSessionRepository.findSession(sessionToken);

        expect(result).toBe(session);
        expect(cache.get).toHaveBeenCalledWith(sessionToken);
        expect(delegate.findSession).not.toHaveBeenCalled();
    });

    it("should reject if session is in cache but it's expired", async () => {
        const expiredSession: Session = Builder<Session>()
            .sessionToken(sessionToken)
            .username('username')
            .expirationDate(DATE_IN_THE_PAST)
            .build();

        cache.get.mockReturnValueOnce(expiredSession);

        await expect(cachedSessionRepository.findSession(sessionToken)).rejects.toBeUndefined();

        expect(cache.get).toHaveBeenCalledWith(sessionToken);
        expect(delegate.findSession).not.toHaveBeenCalled();
    });

    it("should fetch from delegate and store in cache if not cached", async () => {
        cache.get.mockReturnValueOnce(undefined);
        delegate.findSession.mockResolvedValueOnce(session);

        const result = await cachedSessionRepository.findSession(sessionToken);

        expect(result).toBe(session);
        expect(delegate.findSession).toHaveBeenCalledWith(sessionToken);
        expect(cache.set).toHaveBeenCalledWith(sessionToken, session);
    });

    it("should reject if session is not found", async () => {
        cache.get.mockReturnValueOnce(null);
        delegate.findSession.mockResolvedValueOnce(null);

        await expect(cachedSessionRepository.findSession("invalid-token")).rejects.toBeUndefined();

        expect(delegate.findSession).toHaveBeenCalledWith("invalid-token");
        expect(cache.set).not.toHaveBeenCalled();
    });
});
