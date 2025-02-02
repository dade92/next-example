import {moviesRepository} from "../../main/repository/MoviesRepository";
import {Movie} from "../../../data/movies/Movie";
import {searchMovieUseCase} from "../../main/usecases/SearchMovieUseCase";
import {Builder} from "builder-pattern";

jest.mock('../../main/repository/MoviesRepository');

describe('searchMovieUseCase', () => {
    it('should return the found movie', async () => {
        const title = 'title';

        const response = Builder<Movie>().title('title').build();

        (moviesRepository.findByTitle as jest.Mock).mockResolvedValue(response);
        const result = await searchMovieUseCase(title);

        expect(moviesRepository.findByTitle).toHaveBeenCalledWith(title);
        expect(result).toEqual(response);
    });
});
