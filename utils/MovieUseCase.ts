import {moviesRepository} from "./repository/MoviesRepository";
import {Movie} from "../data/movies/Movie";

export const PAGE_SIZE = 10;

export const getMoviesUseCase = async (page: number): Promise<MovieResponse> => {
    const movies = await moviesRepository.findBy(page, PAGE_SIZE);
    return {
        movies,
        pageSize: PAGE_SIZE
    };
}


export interface MovieResponse {
    movies: Movie[];
    pageSize: number;
}