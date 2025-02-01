import {Book} from "../../../pages/books";
import {adaptBooksGenericResponse, ApiResponse} from "./ApiResponse";

export const getBooks = async (): Promise<Book[]> => {
    const result = await fetch('https://the-one-api.dev/v2/book', {headers: {"Authorization": "Bearer T9GT1GYa_3DluLcsGOog"}})
        .then((r) => {
            return r.json() as Promise<ApiResponse>
        }).catch(() => {
            console.log('Error retrieving books')
            throw Error
        });

    return adaptBooksGenericResponse(result)
}