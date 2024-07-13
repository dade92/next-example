import {Book} from "../../pages/books";
import {Movie} from "../../pages/movies";

export interface GenericResponse {
    docs: [{
        _id: string;
        name: string;
    }]
}

export const adaptBooksGenericResponse = (result: GenericResponse): Book[] =>
    result.docs.map((br: { _id: string; name: string }) => {
        return {
            id: br._id,
            title: br.name
        }
    });

export const adaptMoviesGenericResponse = (result: GenericResponse): Movie[] =>
    result.docs.map((br: { _id: string; name: string }) => {
        return {
            id: br._id,
            title: br.name
        }
    });