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
                console.log(`Query is ${search}`)
                const result = await searchMovies(search);

                if (!result) {
                    return res.status(404).end();
                }

                // Return the found movie
                return res.status(200).json({movie: result});
            } catch (error) {
                // If any error occurs (e.g., promise rejection), return 404
                console.error('Error searching for movie:', error);
                return res.status(404).end();
            }
            break;
        default:
            return res.status(405).send(null)
    }
}

async function searchMovies(query: string): Promise<Movie | null> {
    return moviesRepository.findByTitle(query)
}
