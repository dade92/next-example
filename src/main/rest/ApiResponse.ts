import {Book} from "../../../pages/books";
import {LegacyMovie} from "../../../pages/legacyMovies";

export interface ApiResponse {
    docs: [{
        _id: string;
        name: string;
    }]
}

export const adaptBooksGenericResponse = (result: ApiResponse): Book[] => innerRetrieve(result);

export const adaptMoviesGenericResponse = (result: ApiResponse): LegacyMovie[] => innerRetrieve(result);

const innerRetrieve = (result: ApiResponse) =>
    result.docs.map((br: { _id: string; name: string }) => {
        return {
            id: br._id,
            title: br.name
        }
    });
