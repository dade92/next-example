import type {NextApiRequest, NextApiResponse} from 'next'
import {moviesRepository} from "../../../src/main/repository/MoviesRepository";
import {Comment} from "../../../data/movies/Movie";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<null>
) {
    switch (req.method) {
        case 'POST':
            try {
                const comment = req.body as Comment;
                const {movieId} = req.query;

                await addCommentUseCase(comment, movieId as string);

                res.status(204).end();
            } catch (error) {
                res.status(500).end();
            }
            break;
        default:
            return res.status(405).send(null)
    }
}

const addCommentUseCase = async (comment: Comment, movieId: string): Promise<any> =>
    moviesRepository.addComment(comment, movieId);
