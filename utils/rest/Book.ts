import {Book} from "../../pages/books";
import {adaptBooksGenericResponse, GenericResponse} from "./GenericResponse";

export const getBooks = async (): Promise<Book[]> => {
    let result: GenericResponse = await fetch('https://the-one-api.dev/v2/book', {headers: {"Authorization": "Bearer T9GT1GYa_3DluLcsGOog"}})
        .then((r) => {
            return r.json() as Promise<GenericResponse>
        }).catch(() => {
            console.log('Error retrieving books')
            throw Error
        });

    return adaptBooksGenericResponse(result)
}