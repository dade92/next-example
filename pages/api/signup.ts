import type {NextApiRequest, NextApiResponse} from "next";
import {signupUseCase} from "../../src/main/usecases/SignupUseCase";

interface SignUpResponse {
}

interface SignUpRequest {
    username: string;
    email: string;
    password: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SignUpResponse | null>
) {
    switch (req.method) {
        case 'POST':
            //TODO map better the response
            const request = req.body as SignUpRequest;
            try {
                await signupUseCase(
                    {
                        username: request.username,
                        email: request.email,
                        password: request.password
                    }
                );
                return res.status(200).end()
            } catch (e) {
                return res.status(400).end()
            }
        default:
            return res.status(405).send(null)
    }
}