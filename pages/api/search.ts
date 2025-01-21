import type {NextApiRequest, NextApiResponse} from 'next'
import {Movie} from "../../data/movies/Movie";

export type SearchMovieResponse = {
    movie: Movie
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SearchMovieResponse | null>
) {
    switch (req.method) {
        case 'GET':
            console.log(`Query is ${req.query}`)
            const result = await searchMovies(req.query)
            res.status(200).json({ movie: result });
            break;
        default:
            return res.status(405).send(null)
    }
}

// Example method that receives the search string
async function searchMovies(searchString): Promise<Movie> {
    return {
        id: "123",
        title: "Interstellar",
        plot: "plot",
        fullPlot: "full plot",
        posterUrl: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SY1000_SX677_AL_.jpg",
        year: 2014,
        genres: ["Adventure", "Scifi"],
        directors: ["Christofer Nolan"],
        rating: 7.5,
    }
}
