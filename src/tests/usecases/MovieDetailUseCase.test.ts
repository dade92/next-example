import {moviesRepository} from "../../main/repository/MoviesRepository";
import {retrieveMovieDetailsUseCase} from "../../main/usecases/RetrieveMovieDetailUseCase";
import {MovieDetail} from "../../../data/movies/Movie";

jest.mock('../../main/repository/MoviesRepository');

describe('getMovieDetailsUseCase', () => {
    it('should return movie details for the given id', async () => {
        const movieId = '123';
        const response: MovieDetail = {
            comments: [
                {
                    name: 'name',
                    email: 'email',
                    text: 'comment'
                }
            ]
        };

        (moviesRepository.findMovieDetail as jest.Mock).mockResolvedValue(response);

        const result = await retrieveMovieDetailsUseCase(movieId);

        expect(moviesRepository.findMovieDetail).toHaveBeenCalledWith(movieId);
        expect(result).toEqual(response);
    });
});
