import {Book} from "../../../pages/books";

export interface ApiResponse {
    docs: [{
        _id: string;
        name: string;
    }]
}

export const adaptBooksGenericResponse = (result: ApiResponse): Book[] => innerRetrieve(result);

const innerRetrieve = (result: ApiResponse) =>
    result.docs.map((br: { _id: string; name: string }) => {
        return {
            id: br._id,
            title: br.name
        }
    });
