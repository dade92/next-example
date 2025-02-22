import type {NextApiRequest, NextApiResponse} from 'next'
import {Movie} from "../../data/movies/Movie";
import {searchMovieUseCase} from "../../src/main/usecases/SearchMovieUseCase";
import {moviesRepository} from "../../src/main/repository/Configuration";

export type SearchMovieResponse = {
    movie: Movie
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SearchMovieResponse | null>
) {
    switch (req.method) {
        case 'GET':
            try {
                const search = req.query.query as string;
                const result = await searchMovieUseCase(search, moviesRepository);

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