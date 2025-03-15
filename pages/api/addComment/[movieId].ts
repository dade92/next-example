import type {NextApiRequest, NextApiResponse} from 'next'
import {Comment} from "../../../data/movies/Movie";
import {addCommentUseCase} from "../../../src/main/usecases/AddCommentUseCase";
import {checkAuthTokenUseCase} from "../../../src/main/usecases/CheckAuthTokenUseCase";
import {movieDetailsRepository} from "../../../src/main/repository/Configuration";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<null>
) {
    switch (req.method) {
        case 'POST':
            try {
                const authToken = req.cookies.authToken as string;
                const comment = req.body as Comment;
                const {movieId} = req.query;

                const valid = await checkAuthTokenUseCase(authToken);
                if (valid) {
                    await addCommentUseCase(comment, movieId as string, movieDetailsRepository);
                    res.status(204).end();
                } else {
                    res.status(401).end();
                }
            } catch (error) {
                res.status(500).end();
            }
            break;
        default:
            return res.status(405).send(null)
    }
}