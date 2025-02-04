import {Movie} from "../../../data/movies/Movie";
import {moviesRepository} from "../repository/MoviesRepository";

export const searchMovieUseCase = async (title: string): Promise<Movie | null> =>
    moviesRepository.findByTitle(title)
