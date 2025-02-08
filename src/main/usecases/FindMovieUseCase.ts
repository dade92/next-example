import {Movie} from "../../../data/movies/Movie";
import {moviesRepository} from "../repository/Configuration";

export const findMovieUseCase = async (id: string): Promise<Movie | null> =>
    moviesRepository.findById(id)