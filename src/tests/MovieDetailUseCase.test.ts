import {moviesRepository} from "../repository/MoviesRepository";
import {getMovieDetailsUseCase} from "../MovieDetailUseCase";
import {MovieDetail} from "../../data/movies/Movie";

jest.mock('../repository/moviesRepository');

describe('getMovieDetailsUseCase', () => {
    it('should return movie details for the given id', async () => {
        const movieId = '123';
        const response: MovieDetail = {
            comments: []
        };

        (moviesRepository.findMovieDetail as jest.Mock).mockResolvedValue(response);

        const result = await getMovieDetailsUseCase(movieId);

        expect(moviesRepository.findMovieDetail).toHaveBeenCalledWith(movieId);
        expect(result).toEqual(response);
    });
});
