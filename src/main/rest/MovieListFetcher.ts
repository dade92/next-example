import {SearchMovieResponse} from "../../../pages/api/search";
import {myFetch} from "./MyFetch";

export const moviesFetcher = async (url: string): Promise<SearchMovieResponse> =>
    myFetch(url)
        .then((res) => {
            if (!res.ok) throw {
                status: res.status,
            };
            return res.json();
        });