import {adaptMoviesGenericResponse, ApiResponse} from "./ApiResponse";
import {Movie} from "../../pages/movies";

export const getMovies = async (): Promise<Movie[]> => {
    let result: ApiResponse = await fetch('https://the-one-api.dev/v2/movie', {headers: {"Authorization": "Bearer T9GT1GYa_3DluLcsGOog"}})
        .then((r) => {
            return r.json() as Promise<ApiResponse>
        }).catch(() => {
            console.log('Error retrieving books')
            throw Error
        });

    return adaptMoviesGenericResponse(result)
}