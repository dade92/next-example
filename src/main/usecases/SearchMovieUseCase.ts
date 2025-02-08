import {Movie} from "../../../data/movies/Movie";
import {moviesRepository} from "../repository/Configuration";

export const searchMovieUseCase = async (title: string): Promise<Movie | null> =>
    moviesRepository.findByTitle(title)
