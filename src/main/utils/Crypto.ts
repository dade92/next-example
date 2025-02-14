import crypto from "crypto";

export const hashWithSHA256 = (data: string): string =>
    crypto.createHash('sha256').update(data).digest('hex');