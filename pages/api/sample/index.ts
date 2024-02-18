// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Data} from "../hello";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch(req.method) {
        case 'POST':
            return res.status(200).json({ name: 'John Doe' })
        default:
            return res.status(405).json({name: 'Method not supported'})
    }
}
