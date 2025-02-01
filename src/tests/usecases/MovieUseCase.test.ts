import {moviesRepository} from "../../main/repository/MoviesRepository";
import {getMoviesUseCase, PAGE_SIZE} from "../../main/usecases/MovieUseCase";

jest.mock('../../main/repository/MoviesRepository');

describe('getMoviesUseCase', () => {
    it('should return movies correctly', async () => {
        const movies = [{id: 1, title: 'Movie 1'}];
        const count = 100;

        (moviesRepository.findBy as jest.Mock).mockResolvedValue(movies);
        (moviesRepository.countMovies as jest.Mock).mockResolvedValue(count);

        const page = 2;

        const result = await getMoviesUseCase(page);

        expect(moviesRepository.findBy).toHaveBeenCalledWith(page, PAGE_SIZE);
        expect(moviesRepository.countMovies).toHaveBeenCalled();
        expect(result).toEqual({
            movies: movies,
            pageSize: PAGE_SIZE,
            documentsCount: count,
        });
    });
});
