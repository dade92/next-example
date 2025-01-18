import {adaptMoviesGenericResponse, ApiResponse} from "./ApiResponse";
import {Movie} from "../../pages/movies";
import {Movie2} from "../../pages/mflix";
import {moviesRepository} from "../db/MoviesRepository";

export const getMovies = async (): Promise<Movie[]> => {
    const result = await fetch('https://the-one-api.dev/v2/movie', {headers: {"Authorization": "Bearer T9GT1GYa_3DluLcsGOog"}})
        .then((r) => {
            return r.json() as Promise<ApiResponse>
        }).catch(() => {
            console.log('Error retrieving books')
            throw Error
        });

    return adaptMoviesGenericResponse(result)
}

export const getMovies2 = async (): Promise<Movie2[]> => {
    return await moviesRepository.findFirstTen();
}