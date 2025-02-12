import type {NextApiRequest, NextApiResponse} from "next";
import {signupUseCase} from "../../src/main/usecases/SignupUseCase";
import {signUpRequestToUserAdapter} from "../../src/main/adapters/SignUpRequestAdapter";

interface SignUpResponse {
}

export interface SignUpRequest {
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
            const request = req.body as SignUpRequest;
            //TODO can be extracted everything in a proper method
            try {
                const result = await signupUseCase(
                    signUpRequestToUserAdapter(request)
                );
                if (result) {
                    return res.status(204).end()
                } else {
                    res.status(500).end()
                }
            } catch (e) {
                return res.status(500).end()
            }
        default:
            return res.status(405).send(null)
    }
}