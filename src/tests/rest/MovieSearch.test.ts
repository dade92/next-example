import {movieFetcher} from "../../main/rest/MovieSearch";
import {myFetch} from "../../main/rest/MyFetch";
import {Movie} from "../../../data/movies/Movie";
import {Builder} from "builder-pattern";

jest.mock("../../main/rest/MyFetch", () => ({
    myFetch: jest.fn()
}));

describe("moviesFetcher", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    const url = "http://an_url.com";

    it("should return data when the fetch response is OK", async () => {
        const mockResponse = {movie: Builder<Movie>().title('inception').build()};

        (myFetch as jest.Mock).mockResolvedValue({
            status: 200,
            json: jest.fn().mockResolvedValue(mockResponse)
        });

        const data = await movieFetcher(url);

        expect(data).toEqual(mockResponse);
        expect(myFetch).toHaveBeenCalledWith(url);
    });

    it("should throw an error object when the fetch response is an error", async () => {
        (myFetch as jest.Mock).mockResolvedValue({
            status: 404,
        });

        await expect(movieFetcher(url)).rejects.toEqual({status: 404});
        expect(myFetch).toHaveBeenCalledWith(url);
    });
});
