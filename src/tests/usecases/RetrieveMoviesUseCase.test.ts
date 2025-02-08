import {retrieveMoviesUseCase, PAGE_SIZE} from "../../main/usecases/RetrieveMoviesUseCase";
import {moviesRepository} from "../../main/repository/Configuration";

jest.mock('../../main/repository/Configuration');

describe('getMoviesUseCase', () => {
    it('should return movies correctly', async () => {
        const movies = [{id: 1, title: 'Movie 1'}];
        const count = 100;

        (moviesRepository.findBy as jest.Mock).mockResolvedValue(movies);
        (moviesRepository.countMovies as jest.Mock).mockResolvedValue(count);

        const page = 2;

        const result = await retrieveMoviesUseCase(page);

        expect(moviesRepository.findBy).toHaveBeenCalledWith(page, PAGE_SIZE);
        expect(moviesRepository.countMovies).toHaveBeenCalled();
        expect(result).toEqual({
            movies: movies,
            pageSize: PAGE_SIZE,
            documentsCount: count,
        });
    });
});
