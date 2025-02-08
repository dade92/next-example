import {Comment} from "../../../data/movies/Movie";
import {commentsRepository} from "../repository/CommentsRepository";

export const addCommentUseCase = async (comment: Comment, movieId: string): Promise<any> =>
    commentsRepository.addComment(comment, movieId);
