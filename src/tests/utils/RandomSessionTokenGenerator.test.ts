import {randomSessionTokenGenerator} from "../../main/utils/RandomSessionTokenGenerator";

describe('randomSessionTokenGenerator', () => {
    it('should generate different session tokens', () => {
        const tokens = new Set<string>();

        for (let i = 0; i < 1000; i++) {
            tokens.add(randomSessionTokenGenerator());
        }

        expect(tokens.size).toBe(1000);
    });
});