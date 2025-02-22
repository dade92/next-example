import {retrieveMoviesUseCase, PAGE_SIZE} from "../../main/usecases/RetrieveMoviesUseCase";
import {Builder} from "builder-pattern";
import {Movie} from "../../../data/movies/Movie";
import {CachedMoviesRepository} from "../../main/repository/CachedMoviesRepository";

describe('getMoviesUseCase', () => {
    let moviesRepository: jest.Mocked<CachedMoviesRepository>;

    beforeEach(() => {
        moviesRepository = {
            countMovies: jest.fn(),
            findById: jest.fn(),
            findBy: jest.fn(),
            findByTitle: jest.fn()
        } as unknown as jest.Mocked<CachedMoviesRepository>;
    })

    it('should return movies correctly', async () => {
        const movies = [Builder<Movie>().id('movieId').title('movieTitle').build()];
        const count = 100;

        moviesRepository.findBy.mockResolvedValue(movies);
        moviesRepository.countMovies.mockResolvedValue(count);

        const page = 2;

        const result = await retrieveMoviesUseCase(page, moviesRepository);

        expect(moviesRepository.findBy).toHaveBeenCalledWith(page, PAGE_SIZE);
        expect(moviesRepository.countMovies).toHaveBeenCalled();
        expect(result).toEqual({
            movies: movies,
            pageSize: PAGE_SIZE,
            documentsCount: count,
        });
    });
});
