import {Movie} from "../../../data/movies/Movie";
import {searchMovieUseCase} from "../../main/usecases/SearchMovieUseCase";
import {Builder} from "builder-pattern";
import {CachedMoviesRepository} from "../../main/repository/CachedMoviesRepository";

describe('searchMovieUseCase', () => {
    const title = 'title';
    let moviesRepository: jest.Mocked<CachedMoviesRepository>;

    beforeEach(() => {
        moviesRepository = {
            countMovies: jest.fn(),
            findById: jest.fn(),
            findBy: jest.fn(),
            findByTitle: jest.fn()
        } as unknown as jest.Mocked<CachedMoviesRepository>;
    })

    it('should return the found movie', async () => {
        const response = Builder<Movie>().title('title').build();

        (moviesRepository.findByTitle as jest.Mock).mockResolvedValue(response);
        const result = await searchMovieUseCase(title, moviesRepository);

        expect(moviesRepository.findByTitle).toHaveBeenCalledWith(title);
        expect(result).toEqual(response);
    });

    it('should throw an error when the repository fails', async () => {
        const error = new Error('Repository failure');

        (moviesRepository.findByTitle as jest.Mock).mockRejectedValue(error);

        await expect(searchMovieUseCase(title, moviesRepository)).rejects.toThrow(error);
        expect(moviesRepository.findByTitle).toHaveBeenCalledWith(title);
    });
});
