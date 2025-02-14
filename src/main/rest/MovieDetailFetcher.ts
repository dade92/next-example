import {SearchMovieResponse} from "../../../pages/api/search";
import {myFetch} from "./MyFetch";

export const movieDetailFetcher = async (
    id: string,
): Promise<SearchMovieResponse> =>
    myFetch(`/api/movie/${id}`)
        .then((res) => {
            if (res.status == 200) {
                return res.json();
            } else {
                throw new Error()
            }
        })
        .then((data: SearchMovieResponse) => {
            return data;
        })