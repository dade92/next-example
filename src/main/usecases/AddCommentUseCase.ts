import {Comment} from "../../../data/movies/Movie";
import {MovieDetailsRepository} from "../repository/MovieDetailsRepository";

export const addCommentUseCase = async (
    comment: Comment,
    movieId: string,
    commentsRepository: MovieDetailsRepository
): Promise<any> =>
    commentsRepository.addComment(comment, movieId);
