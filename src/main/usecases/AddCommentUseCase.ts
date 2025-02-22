import {Comment} from "../../../data/movies/Movie";
import {CommentsRepository} from "../repository/CommentsRepository";

export const addCommentUseCase = async (
    comment: Comment,
    movieId: string,
    commentsRepository: CommentsRepository
): Promise<any> =>
    commentsRepository.addComment(comment, movieId);
