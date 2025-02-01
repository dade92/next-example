import {Comment} from "../../../data/movies/Movie";

export const addCommentCall = async (comment: Comment, movieId: string): Promise<any> => {
    return fetch(`/api/addComment/${movieId}`, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {"Content-Type": "application/json"}
    })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(new Error("Failed to add comment"));
            }
            return Promise.resolve();
        });
}