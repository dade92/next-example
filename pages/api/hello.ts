// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | null>
) {
  switch(req.method) {
    case 'GET':
      return res.status(200).json({ name: 'Davide' })
    default:
      return res.status(405).send(null)
  }
}
