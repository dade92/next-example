import {Movie} from "../../../data/movies/Movie";
import {CachedMoviesRepository} from "../repository/CachedMoviesRepository";

export const searchMovieUseCase = async (
    title: string,
    moviesRepository: CachedMoviesRepository
): Promise<Movie | null> =>
    moviesRepository.findByTitle(title)
