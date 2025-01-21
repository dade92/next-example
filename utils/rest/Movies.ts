import {adaptMoviesGenericResponse, ApiResponse} from "./ApiResponse";
import {LegacyMovie} from "../../pages/legacyMovies";
import {Movie} from "../../data/movies/Movie";

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

interface SearchRequestBody {
    search: string;
}

interface SearchResponse {
    movie: Movie;
}

//TODO unused
export const restSearchMovie = async (search: string): Promise<Movie> => {
    const requestBody: SearchRequestBody = { search };

    const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify(requestBody)
    });

    const data: SearchResponse = await response.json();
    return data.movie;
}

