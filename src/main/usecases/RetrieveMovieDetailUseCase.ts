import {MovieDetail} from "../../../data/movies/Movie";
import {MovieDetailsRepository} from "../repository/MovieDetailsRepository";

export const retrieveMovieDetailsUseCase = async (
    id: string,
    movieDetailsRepository: MovieDetailsRepository
): Promise<MovieDetail> =>
    await movieDetailsRepository.findMovieDetail(id)