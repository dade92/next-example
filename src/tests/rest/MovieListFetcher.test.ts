import {moviesFetcher} from "../../main/rest/MovieListFetcher";

describe("moviesFetcher", () => {
    // Clear mocks before each test
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should return JSON data when the fetch response is OK", async () => {
        const mockData = {results: [{id: 1, title: "Test Movie"}]};
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue(mockData),
        };
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const url = "http://example.com/movies";

        const data = await moviesFetcher(url);

        expect(data).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith(url);
    });

    it("should throw an error object with a status property when the fetch response is not OK", async () => {
        const mockResponse = {
            ok: false,
            status: 404,
        };
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const url = "http://example.com/movies";

        await expect(moviesFetcher(url)).rejects.toEqual({status: 404});
        expect(global.fetch).toHaveBeenCalledWith(url);
    });
});
