import {moviesRepository} from "../../main/repository/MoviesRepository";
import {retrieveMovieDetailsUseCase} from "../../main/usecases/RetrieveMovieDetailUseCase";
import {MovieDetail} from "../../../data/movies/Movie";
import {Builder} from "builder-pattern";

jest.mock('../../main/repository/MoviesRepository');

describe('getMovieDetailsUseCase', () => {
    it('should return movie details for the given id', async () => {
        const movieId = '123';
        const response: MovieDetail = Builder<MovieDetail>().comments([
            {
                name: 'name',
                email: 'email',
                text: 'comment'
            }
        ]).build();

        (moviesRepository.findMovieDetail as jest.Mock).mockResolvedValue(response);

        const result = await retrieveMovieDetailsUseCase(movieId);

        expect(moviesRepository.findMovieDetail).toHaveBeenCalledWith(movieId);
        expect(result).toEqual(response);
    });

    it('should throw an error when the repository fails', async () => {
        const movieId = '123';
        const error = new Error('Repository failure');

        (moviesRepository.findMovieDetail as jest.Mock).mockRejectedValue(error);

        await expect(retrieveMovieDetailsUseCase(movieId)).rejects.toThrow(error);
        expect(moviesRepository.findMovieDetail).toHaveBeenCalledWith(movieId);
    });
});
