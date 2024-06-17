import {Book} from "../../pages/books";
import {adaptGenericResponse, GenericResponse} from "./GenericResponse";

export const getMovies = async (): Promise<Book[]> => {
    let result: GenericResponse = await fetch('https://the-one-api.dev/v2/movie', {headers: {"Authorization": "Bearer T9GT1GYa_3DluLcsGOog"}})
        .then((r) => {
            return r.json() as Promise<GenericResponse>
        }).catch(() => {
            console.log('Error retrieving books')
            throw Error
        });

    return adaptGenericResponse(result)
}