export const myFetch = async (
    url: string,
    httpMethod: string = 'GET',
    body: any | null = null
): Promise<Response> =>
    fetch(
        url,
        {
            method: httpMethod,
            headers: {
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : null,
        }
    );