import {adaptMoviesGenericResponse, ApiResponse} from "./ApiResponse";
import {LegacyMovie} from "../../pages/legacyMovies";
import {moviesRepository} from "../db/MoviesRepository";
import {Movie, MovieDetail} from "../movies/Movie";

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

export const getMovies = async (): Promise<Movie[]> => {
    return await moviesRepository.findFirstTen();
}

export const getMovieDetails = async (id: string): Promise<MovieDetail> => {
    return await moviesRepository.findMovieDetail(id);
}