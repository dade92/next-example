import {Comment} from "../../../data/movies/Movie";
import {commentsRepository} from "../repository/Configuration";

export const addCommentUseCase = async (comment: Comment, movieId: string): Promise<any> =>
    commentsRepository.addComment(comment, movieId);
