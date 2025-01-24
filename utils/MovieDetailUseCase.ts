import {MovieDetail} from "../data/movies/Movie";
import {moviesRepository} from "./repository/MoviesRepository";

export const getMovieDetailsUseCase = async (id: string): Promise<MovieDetail> =>
    await moviesRepository.findMovieDetail(id)