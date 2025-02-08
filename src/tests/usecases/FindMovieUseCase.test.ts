import {Movie} from "../../../data/movies/Movie";
import {Builder} from "builder-pattern";
import {findMovieUseCase} from "../../main/usecases/FindMovieUseCase";
import {moviesRepository} from "../../main/repository/Configuration";

jest.mock('../../main/repository/Configuration');

describe('findMovieUseCase', () => {
    it('should find the movie', async () => {
        const movieId = '123';
        const expected = Builder<Movie>().build();

        (moviesRepository.findById as jest.Mock).mockResolvedValue(expected);
        const actual = await findMovieUseCase(movieId);

        expect(moviesRepository.findById).toHaveBeenCalledWith(movieId);
        expect(actual).toEqual(expected);
    });

    it('should throw an error when the repository fails', async () => {
        const movieId = '123';

        const error = new Error('Repository failure');
        (moviesRepository.findById as jest.Mock).mockRejectedValue(error);

        await expect(findMovieUseCase(movieId)).rejects.toThrow(error);
        expect(moviesRepository.findById).toHaveBeenCalledWith(movieId);
    });
});
