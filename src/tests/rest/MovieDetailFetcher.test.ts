import {movieDetailFetcher} from "../../main/rest/MovieDetailFetcher";
import {Builder} from "builder-pattern";
import {Movie} from "../../../data/movies/Movie";
import {myFetch} from "../../main/rest/MyFetch";

jest.mock("../../main/rest/MyFetch", () => ({
    myFetch: jest.fn()
}));

describe("movieDetailFetcher", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    const movieId = "123";

    it("should call onRetrieve with movie data when fetch is successful", async () => {
        const mockResponse = {movie: Builder<Movie>().title('inception').build()};

        (myFetch as jest.Mock).mockResolvedValue({
            status: 200,
            json: jest.fn().mockResolvedValue(mockResponse)
        });

        const result = await movieDetailFetcher(movieId);

        expect(myFetch).toHaveBeenCalledWith(`/api/movie/123`);
        expect(result).toEqual({movie: {title: 'inception'}})
    });

    it("should throw an error when fetch returns an error", async () => {
        (myFetch as jest.Mock).mockResolvedValue({
            status: 404
        });

        await expect(movieDetailFetcher(movieId)).rejects.toThrow();

        expect(myFetch).toHaveBeenCalledWith("/api/movie/123");
    });
})