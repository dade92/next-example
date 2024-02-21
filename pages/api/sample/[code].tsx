import {NextApiRequest, NextApiResponse} from "next";

interface Response {
    code: string;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    const code = req.query.code as string
    switch(req.method) {
        case 'POST':
            return res.status(200).json({ code: code  })
        default:
            return res.status(405).json({code: ''})
    }
}
