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
            const search = req.query.query as string;
            console.log(`Query is ${search}`)
            const result = await searchMovies(search)
            res.status(200).json({movie: result});
            break;
        default:
            return res.status(405).send(null)
    }
}

async function searchMovies(query: string): Promise<Movie> {
    return moviesRepository.findByTitle(query)
}
