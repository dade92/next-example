import {Book} from "../../pages/books";
import {Movie} from "../../pages/movies";

export interface ApiResponse {
    docs: [{
        _id: string;
        name: string;
    }]
}

export const adaptBooksGenericResponse = (result: ApiResponse): Book[] => innerRetrieve(result);

export const adaptMoviesGenericResponse = (result: ApiResponse): Movie[] => innerRetrieve(result);

const innerRetrieve = (result: ApiResponse) =>
    result.docs.map((br: { _id: string; name: string }) => {
        return {
            id: br._id,
            title: br.name
        }
    });
