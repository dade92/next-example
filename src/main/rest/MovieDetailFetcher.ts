import {SearchMovieResponse} from "../../../pages/api/search";

export const movieDetailFetcher = async (
    id: string,
): Promise<SearchMovieResponse> => {
    return fetch(`/api/movie/${id}`)
        .then((res) => {
            if (res.status == 200) {
                return res.json();
            } else {
                throw new Error()
            }
        })
        .then((data: SearchMovieResponse) => {
            return data;
        });
}