import {SearchMovieResponse} from "../../../pages/api/search";
import {myFetch} from "./MyFetch";

export const movieFetcher = async (url: string): Promise<SearchMovieResponse> =>
    myFetch(url)
        .then((res) => {
            if (res.status != 200) throw {
                status: res.status,
            };
            return res.json();
        });