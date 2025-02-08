import {movieDetailFetcher} from "../../main/rest/MovieDetailFetcher";
import {Builder} from "builder-pattern";
import {Movie} from "../../../data/movies/Movie";

describe("movieDetailFetcher", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    const movieId = "123";

    it("should call onRetrieve with movie data when fetch is successful", async () => {
        const mockResponse = {movie: Builder<Movie>().title('inception').build()};

        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 200,
                json: () => Promise.resolve(mockResponse),
            })
        ) as jest.Mock;

        const result = await movieDetailFetcher(movieId);

        expect(fetch).toHaveBeenCalledWith("/api/movie/123");
        expect(result).toEqual({movie: {title: 'inception'}})
    });

    it("should throw an error when fetch returns an error", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({status: 404})
        ) as jest.Mock;

        await expect(movieDetailFetcher(movieId)).rejects.toThrow();

        expect(fetch).toHaveBeenCalledWith("/api/movie/123");
    });
})