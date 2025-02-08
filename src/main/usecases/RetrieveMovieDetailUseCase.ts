import {MovieDetail} from "../../../data/movies/Movie";
import {commentsRepository} from "../repository/CommentsRepository";

export const retrieveMovieDetailsUseCase = async (id: string): Promise<MovieDetail> =>
    await commentsRepository.findMovieDetail(id)