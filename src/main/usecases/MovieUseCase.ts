import {moviesRepository} from "../repository/MoviesRepository";
import {Movie} from "../../../data/movies/Movie";

export const PAGE_SIZE = 10;

export const getMoviesUseCase = async (page: number): Promise<MovieResponse> => {
    const movies = await moviesRepository.findBy(page, PAGE_SIZE);
    const documentCounts = await moviesRepository.countMovies();
    return {
        movies,
        pageSize: PAGE_SIZE,
        documentsCount: documentCounts
    };
}


export interface MovieResponse {
    movies: Movie[];
    pageSize: number;
    documentsCount: number;
}