// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

export type ImageLocation = {
    imageLocation: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ImageLocation | null>
) {
    switch (req.method) {
        case 'POST':
            return res.status(200).json({imageLocation: 'https://davide-s3-12345678900000.s3.eu-central-1.amazonaws.com/download.jpeg'})
        default:
            return res.status(405).send(null)
    }
}
