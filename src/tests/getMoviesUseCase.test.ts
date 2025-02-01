import {moviesRepository} from "../repository/MoviesRepository";
import {getMoviesUseCase, PAGE_SIZE} from "../MovieUseCase";

jest.mock('../repository/moviesRepository');

describe('getMoviesUseCase', () => {
    it('should return movies, pageSize, and documentsCount', async () => {
        // Arrange: Define fake values for movies and document count.
        const fakeMovies = [{id: 1, title: 'Movie 1'}];
        const fakeDocumentCount = 100;

        // Set up the mocked methods to return the fake values.
        (moviesRepository.findBy as jest.Mock).mockResolvedValue(fakeMovies);
        (moviesRepository.countMovies as jest.Mock).mockResolvedValue(fakeDocumentCount);

        const page = 2;

        // Act: Call the use case.
        const result = await getMoviesUseCase(page);

        // Assert: Verify that the repository methods were called correctly and
        // that the result matches the expected shape.
        expect(moviesRepository.findBy).toHaveBeenCalledWith(page, PAGE_SIZE);
        expect(moviesRepository.countMovies).toHaveBeenCalled();
        expect(result).toEqual({
            movies: fakeMovies,
            pageSize: PAGE_SIZE,
            documentsCount: fakeDocumentCount,
        });
    });
});
