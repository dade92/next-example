import {adaptMoviesGenericResponse, ApiResponse} from "./ApiResponse";
import {LegacyMovie} from "../../pages/legacyMovies";
import {moviesRepository} from "../repository/MoviesRepository";
import {Movie, MovieDetail} from "../../data/movies/Movie";

export const PAGE_SIZE = 10;

export const getLegacyMovies = async (): Promise<LegacyMovie[]> => {
    const result = await fetch('https://the-one-api.dev/v2/movie', {headers: {"Authorization": "Bearer T9GT1GYa_3DluLcsGOog"}})
        .then((r) => {
            return r.json() as Promise<ApiResponse>
        }).catch(() => {
            console.log('Error retrieving books')
            throw Error
        });

    return adaptMoviesGenericResponse(result)
}

export interface MovieResponse {
    movies: Movie[];
    pageSize: number;
}

export const getMoviesUseCase = async (page: number): Promise<MovieResponse> => {
    const movies = await moviesRepository.findBy(page, PAGE_SIZE);
    return {
        movies,
        pageSize: PAGE_SIZE
    };
}

export const getMovieDetailsUseCase = async (id: string): Promise<MovieDetail> => {
    return await moviesRepository.findMovieDetail(id);
}