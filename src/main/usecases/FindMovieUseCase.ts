import {Movie} from "../../../data/movies/Movie";
import {CachedMoviesRepository} from "../repository/CachedMoviesRepository";

export const findMovieUseCase = async (
    id: string,
    moviesRepository: CachedMoviesRepository
): Promise<Movie | null> =>
    moviesRepository.findById(id)