import {MovieDetail} from "../../../data/movies/Movie";
import {MovieDetailsRepository} from "../repository/MovieDetailsRepository";

export const retrieveMovieDetailsUseCase = async (
    id: string,
    commentsRepository: MovieDetailsRepository
): Promise<MovieDetail> =>
    await commentsRepository.findMovieDetail(id)