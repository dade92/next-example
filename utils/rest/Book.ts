import {Book} from "../../pages/books";

interface BookResponse {
    docs: [{
        _id: string;
        name: string;
    }]
}

const adaptBookResponse = (result: BookResponse): Book[] =>
    result.docs.map((br: { _id: string; name: string }) => {
        return {
            id: br._id,
            title: br.name
        }
    });

export const getBooks = async (): Promise<Book[]> => {
    let result: BookResponse = await fetch('https://the-one-api.dev/v2/book', {headers: {"Authorization": "Bearer T9GT1GYa_3DluLcsGOog"}})
        .then((r) => {
            return r.json() as Promise<BookResponse>
        }).catch(() => {
            console.log('Error retrieving books')
            throw Error
        });

    return adaptBookResponse(result)
}
