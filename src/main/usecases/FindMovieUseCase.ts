import {Movie} from "../../../data/movies/Movie";
import {moviesRepository} from "../repository/MoviesRepository";

export const findMovieUseCase = async (id: string): Promise<Movie | null> =>
    moviesRepository.findById(id)