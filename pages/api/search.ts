import type {NextApiRequest, NextApiResponse} from 'next'
import {Movie} from "../../data/movies/Movie";
import {moviesRepository} from "../../utils/repository/MoviesRepository";

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
                const result = await searchMovieUseCase(search);

                if (!result) {
                    return res.status(404).end();
                }

                // Return the found movie
                return res.status(200).json({movie: result});
            } catch (error) {
                return res.status(404).end();
            }
        default:
            return res.status(405).send(null)
    }
}

const searchMovieUseCase = async (title: string): Promise<Movie | null> =>
    moviesRepository.findByTitle(title)
