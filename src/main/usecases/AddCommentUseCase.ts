import {Comment} from "../../../data/movies/Movie";
import {moviesRepository} from "../repository/MoviesRepository";

export const addCommentUseCase = async (comment: Comment, movieId: string): Promise<any> =>
    moviesRepository.addComment(comment, movieId);
