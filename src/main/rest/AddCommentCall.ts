import {Comment} from "../../../data/movies/Movie";
import {myFetch} from "./MyFetch";

export const addCommentCall = async (comment: Comment, movieId: string): Promise<any> =>
    myFetch(`/api/addComment/${movieId}`, 'POST', comment)
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(new Error("Failed to add comment"));
            }
            return Promise.resolve();
        })