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
            signupUseCase(
                request.username,
                request.password,
                request.email
            );

            return res.status(200).end()
        default:
            return res.status(405).send(null)
    }
}