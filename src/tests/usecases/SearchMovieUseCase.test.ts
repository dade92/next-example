import {Movie} from "../../../data/movies/Movie";
import {searchMovieUseCase} from "../../main/usecases/SearchMovieUseCase";
import {Builder} from "builder-pattern";
import {moviesRepository} from "../../main/repository/Configuration";

jest.mock('../../main/repository/Configuration');

describe('searchMovieUseCase', () => {
    const title = 'title';

    it('should return the found movie', async () => {
        const response = Builder<Movie>().title('title').build();

        (moviesRepository.findByTitle as jest.Mock).mockResolvedValue(response);
        const result = await searchMovieUseCase(title);

        expect(moviesRepository.findByTitle).toHaveBeenCalledWith(title);
        expect(result).toEqual(response);
    });

    it('should throw an error when the repository fails', async () => {
        const error = new Error('Repository failure');

        (moviesRepository.findByTitle as jest.Mock).mockRejectedValue(error);

        await expect(searchMovieUseCase(title)).rejects.toThrow(error);
        expect(moviesRepository.findByTitle).toHaveBeenCalledWith(title);
    });
});
