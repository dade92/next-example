import {Comment} from "../../../data/movies/Movie";
import {MovieDetailsRepository} from "../repository/MovieDetailsRepository";

export const addCommentUseCase = async (
    comment: Comment,
    movieId: string,
    movieDetailsRepository: MovieDetailsRepository
): Promise<any> =>
    movieDetailsRepository.addComment(comment, movieId);
