import {sessionRepository} from "../../main/repository/Configuration";
import {nowProvider} from "../../main/utils/NowProvider";
import {checkAuthTokenUseCase} from "../../main/usecases/CheckAuthTokenUseCase";

jest.mock('../../main/repository/Configuration', () => ({
    sessionRepository: {
        findSession: jest.fn(),
    },
}));

jest.mock('../../main/utils/NowProvider', () => ({
    nowProvider: jest.fn(),
}));

describe('checkAuthTokenUseCase', () => {
    const token = 'valid-token';
    const firstOfJanuary = new Date(2025, 1, 1);
    const secondOfJanuary = new Date(2025, 1, 2);
    const thirtyFirstOfDecember = new Date(2024, 12, 31);

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return true if session exists and is not expired', async () => {

        const mockSession = {expirationDate: secondOfJanuary};

        (sessionRepository.findSession as jest.Mock).mockResolvedValue(mockSession);
        (nowProvider as jest.Mock).mockReturnValue(firstOfJanuary);

        const result = await checkAuthTokenUseCase(token);

        expect(result).toBe(true);
        expect(sessionRepository.findSession).toHaveBeenCalledWith(token);
        expect(nowProvider).toHaveBeenCalled();
    });

    it('should return false if session does not exist', async () => {
        (sessionRepository.findSession as jest.Mock).mockResolvedValue(null);

        const result = await checkAuthTokenUseCase(token);

        expect(result).toBe(false);
        expect(sessionRepository.findSession).toHaveBeenCalledWith(token);
    });

    it('should return false if session is expired', async () => {
        const mockSession = {expirationDate: thirtyFirstOfDecember};

        (sessionRepository.findSession as jest.Mock).mockResolvedValue(mockSession);
        (nowProvider as jest.Mock).mockReturnValue(firstOfJanuary);

        const result = await checkAuthTokenUseCase(token);

        expect(result).toBe(false);
        expect(sessionRepository.findSession).toHaveBeenCalledWith(token);
        expect(nowProvider).toHaveBeenCalled();
    });

    it('should return false if an error occurs', async () => {
        (sessionRepository.findSession as jest.Mock).mockRejectedValue(new Error('Database error'));

        const result = await checkAuthTokenUseCase(token);

        expect(result).toBe(false);
        expect(sessionRepository.findSession).toHaveBeenCalledWith(token);
    });
});
