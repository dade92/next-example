import type {NextApiRequest, NextApiResponse} from "next";

interface LoginResponse {
    result: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LoginResponse | null>
) {
    switch (req.method) {
        case 'POST':
            console.log('login API called')
            return res.status(200).send({result: ''})
        default:
            return res.status(405).send(null)
    }
}