import {adaptMoviesGenericResponse, ApiResponse} from "./ApiResponse";
import {LegacyMovie} from "../../pages/legacyMovies";

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