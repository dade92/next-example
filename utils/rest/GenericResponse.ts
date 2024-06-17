import {Book} from "../../pages/books";

export interface GenericResponse {
    docs: [{
        _id: string;
        name: string;
    }]
}

export const adaptGenericResponse = (result: GenericResponse): Book[] =>
    result.docs.map((br: { _id: string; name: string }) => {
        return {
            id: br._id,
            title: br.name
        }
    });