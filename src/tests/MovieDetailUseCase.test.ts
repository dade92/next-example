import {moviesRepository} from "../main/repository/MoviesRepository";
import {getMovieDetailsUseCase} from "../main/usecases/MovieDetailUseCase";
import {MovieDetail} from "../../data/movies/Movie";

jest.mock('../main/repository/moviesRepository');

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

        const result = await getMovieDetailsUseCase(movieId);

        expect(moviesRepository.findMovieDetail).toHaveBeenCalledWith(movieId);
        expect(result).toEqual(response);
    });
});
