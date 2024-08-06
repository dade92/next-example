import type {NextApiRequest, NextApiResponse} from 'next'
import {Post} from "../../utils/rest/PostsRetriever";

export type PostsResponse = {
    posts: Post[]
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<PostsResponse>
) {
    switch (req.method) {
        case 'POST':
            return res.status(200).json({
                posts: [
                    {name: 'ciccio', imageLocation: ''},
                    {name: 'pasticcio', imageLocation: ''}
                ]
            });
        default:
            return res.status(405)
    }
}
