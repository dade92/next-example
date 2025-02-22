import {Movie} from "../../../data/movies/Movie";
import {CachedMoviesRepository} from "../repository/CachedMoviesRepository";

export const PAGE_SIZE = 10;

export const retrieveMoviesUseCase = async (
    page: number,
    moviesRepository: CachedMoviesRepository
): Promise<MovieResponse> => {
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