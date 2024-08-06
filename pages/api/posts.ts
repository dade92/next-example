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
        case 'GET':
            return res.status(200).json({
                posts: [
                    {name: 'AWS.png', imageLocation: 'https://davide-s3-12345678900000.s3.eu-central-1.amazonaws.com/AWS.png'},
                    {name: 'docker.png', imageLocation: 'https://davide-s3-12345678900000.s3.eu-central-1.amazonaws.com/docker.png'},
                    {name: 'Java.svg', imageLocation: 'https://davide-s3-12345678900000.s3.eu-central-1.amazonaws.com/Java.svg'},
                ]
            });
        default:
            return res.status(405)
    }
}
