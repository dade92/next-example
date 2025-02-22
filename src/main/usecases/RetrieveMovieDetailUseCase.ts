import {MovieDetail} from "../../../data/movies/Movie";
import {CommentsRepository} from "../repository/CommentsRepository";

export const retrieveMovieDetailsUseCase = async (
    id: string,
    commentsRepository: CommentsRepository
): Promise<MovieDetail> =>
    await commentsRepository.findMovieDetail(id)