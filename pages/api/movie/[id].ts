import type {NextApiRequest, NextApiResponse} from 'next'
import {findMovieUseCase} from "../../../src/main/usecases/FindMovieUseCase";
import {SearchMovieResponse} from "../search";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SearchMovieResponse | null>
) {
    switch (req.method) {
        case 'GET':
            try {
                const {id} = req.query;
                const result = await findMovieUseCase(id as string);

                if (!result) {
                    return res.status(404).end();
                }

                return res.status(200).json({movie: result});
            } catch (error) {
                return res.status(404).end();
            }
        default:
            return res.status(405).send(null)
    }
}