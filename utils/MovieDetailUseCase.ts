import {MovieDetail} from "../data/movies/Movie";
import {moviesRepository} from "./repository/MoviesRepository";

export const getMovieDetailsUseCase = async (id: string): Promise<MovieDetail> => {
    return await moviesRepository.findMovieDetail(id);
}