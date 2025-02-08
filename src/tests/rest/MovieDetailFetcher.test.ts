import {movieDetailFetcher} from "../../main/rest/MovieDetailFetcher";

describe("movieDetailFetcher", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    const wait = async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
    }

    it("should call onRetrieve with movie data when fetch is successful", async () => {
        const mockResponse = {title: "Inception", year: 2010};
        const movieId = "123";

        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 200,
                json: () => Promise.resolve(mockResponse),
            })
        ) as jest.Mock;

        const onRetrieveMock = jest.fn();
        movieDetailFetcher(movieId, onRetrieveMock);

        await wait();
        expect(fetch).toHaveBeenCalledWith("/api/movie/123");
        expect(onRetrieveMock).toHaveBeenCalledWith(mockResponse);
    });

    it("should throw an error when fetch returns an error", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({status: 404})
        ) as jest.Mock;
        const onRetrieveMock = jest.fn();

        const movieId = "123";

        await expect(movieDetailFetcher(movieId, onRetrieveMock)).rejects.toThrow();

        expect(fetch).toHaveBeenCalledWith("/api/movie/123");
        expect(onRetrieveMock).not.toHaveBeenCalled();
    });
})