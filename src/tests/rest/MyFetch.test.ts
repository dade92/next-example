import {myFetch} from "../../main/rest/MyFetch";
import fetch, { Response } from "node-fetch";

global.fetch = jest.fn();

describe("myFetch", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should call fetch with the correct arguments for a GET request", async () => {
        const mockResponse = new Response(JSON.stringify({ success: true }), { status: 200 });
        (fetch as jest.Mock).mockResolvedValue(mockResponse);

        const url = "https://api.example.com/data";
        const httpMethod = "GET";

        const response = await myFetch(url, httpMethod);

        expect(fetch).toHaveBeenCalledWith(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: null,
        });
        expect(response).toBe(mockResponse);
    });

    it("should call fetch with the correct arguments for a POST request with a body", async () => {
        const mockResponse = new Response(JSON.stringify({ success: true }), { status: 201 });
        (fetch as jest.Mock).mockResolvedValue(mockResponse);

        const url = "https://api.example.com/data";
        const httpMethod = "POST";
        const body = { key: "value" };

        const response = await myFetch(url, httpMethod, body);

        expect(fetch).toHaveBeenCalledWith(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        expect(response).toBe(mockResponse);
    });
});
