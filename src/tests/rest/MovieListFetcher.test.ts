import {moviesFetcher} from "../../main/rest/MovieListFetcher";

describe("moviesFetcher", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    const url = "http://an_url.com";

    it("should return data when the fetch response is OK", async () => {
        const mockData = {results: [{id: 1, title: "Test Movie"}]};
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue(mockData),
        };
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const data = await moviesFetcher(url);

        expect(data).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith(url);
    });

    it("should throw an error object when the fetch response is an error", async () => {
        const mockResponse = {
            ok: false,
            status: 404,
        };
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await expect(moviesFetcher(url)).rejects.toEqual({status: 404});
        expect(global.fetch).toHaveBeenCalledWith(url);
    });
});
