// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export type Data = {
  content: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | null>
) {
  switch(req.method) {
    case 'GET':
      const name = req.query.fileName
        if(name == 'download.jpeg') {
          return res.status(200).json({ content: 'File content here!' })
        } else {
          return res.status(404).send(null)
        }
    default:
      return res.status(405).send(null)
  }
}
