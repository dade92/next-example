import type {NextApiRequest, NextApiResponse} from "next";
import {loginUseCase} from "../../src/main/usecases/LoginUseCase";

export interface LoginResponse {
    token: string;
    expirationDate: Date;
    username: string;
    email: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LoginResponse | null>
) {
    switch (req.method) {
        case 'POST':
            const result = await loginUseCase(req.body.username, req.body.password);

            if (result) {
                return res.status(200).json({
                    token: result.token,
                    expirationDate: result.expirationDate,
                    username: result.username,
                    email: result.email
                })
            } else {
                return res.status(401).end()
            }
        default:
            return res.status(405).send(null)
    }
}