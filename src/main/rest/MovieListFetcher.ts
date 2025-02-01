import {SearchMovieResponse} from "../../../pages/api/search";

export const moviesFetcher = async (url: string): Promise<SearchMovieResponse> =>
    fetch(url)
        .then((res) => {
            if (!res.ok) throw {
                status: res.status,
            };
            return res.json();
        });