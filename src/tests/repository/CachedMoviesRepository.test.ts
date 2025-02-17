import NodeCache from 'node-cache';
import {CachedMoviesRepository} from "../../main/repository/CachedMoviesRepository";
import {Movie} from "../../../data/movies/Movie";
import {MoviesRepository} from "../../main/repository/MoviesRepository";
import {Builder} from "builder-pattern";

jest.mock('node-cache');

describe('CachedMoviesRepository', () => {
    let delegate: jest.Mocked<MoviesRepository>;
    let repository: CachedMoviesRepository;
    let mockCache: jest.Mocked<NodeCache>;
    const movieId = 'XXX';
    let movieTitle = 'title';
    const movie: Movie = Builder<Movie>().id(movieId).title(movieTitle).build();
    const movies: Movie[] = [movie];

    beforeEach(() => {
        delegate = {
            countMovies: jest.fn(),
            findById: jest.fn(),
            findBy: jest.fn(),
            findByTitle: jest.fn()
        } as unknown as jest.Mocked<MoviesRepository>;

        mockCache = new NodeCache() as jest.Mocked<NodeCache>;
        mockCache.get = jest.fn();
        mockCache.set = jest.fn();

        (NodeCache as unknown as jest.Mock).mockImplementation(() => mockCache);

        repository = new CachedMoviesRepository(delegate);
    });

    let page = 1;
    let pageSize = 10;
    test('countMovies should call delegate', async () => {
        delegate.countMovies.mockResolvedValue(pageSize);

        const result = await repository.countMovies();

        expect(result).toBe(pageSize);
        expect(delegate.countMovies).toHaveBeenCalledTimes(page);
    });

    test('findById should return cached movie if exists', async () => {
        mockCache.get.mockReturnValue(movie);

        const result = await repository.findById(movieId);

        expect(result).toBe(movie);
        expect(mockCache.get).toHaveBeenCalledWith(movieId);
        expect(delegate.findById).not.toHaveBeenCalled();
    });

    test('findById should fetch from delegate and cache it if not found in cache', async () => {
        mockCache.get.mockReturnValue(undefined);
        delegate.findById.mockResolvedValue(movie);

        const result = await repository.findById(movieId);

        expect(result).toBe(movie);
        expect(mockCache.get).toHaveBeenCalledWith(movieId);
        expect(delegate.findById).toHaveBeenCalledWith(movieId);
        expect(mockCache.set).toHaveBeenCalledWith(movieId, movie);
    });

    test('findBy should return cached page if exists', async () => {
        mockCache.get.mockReturnValue(movies);

        const result = await repository.findBy(page, pageSize);

        expect(result).toBe(movies);
        expect(mockCache.get).toHaveBeenCalledWith(page);
        expect(delegate.findBy).not.toHaveBeenCalled();
    });

    test('findBy should fetch from delegate and cache it if not found in cache', async () => {
        mockCache.get.mockReturnValue(undefined);
        delegate.findBy.mockResolvedValue(movies);

        const result = await repository.findBy(page, pageSize);

        expect(result).toBe(movies);
        expect(mockCache.get).toHaveBeenCalledWith(page);
        expect(delegate.findBy).toHaveBeenCalledWith(page, pageSize);
        expect(mockCache.set).toHaveBeenCalledWith(page, movies);
    });

    test('findByTitle should return cached movie if exists', async () => {
        mockCache.get.mockReturnValue(movie);

        const result = await repository.findByTitle(movieTitle);

        expect(result).toBe(movie);
        expect(mockCache.get).toHaveBeenCalledWith(movieTitle);
        expect(delegate.findByTitle).not.toHaveBeenCalled();
    });

    test('findByTitle should fetch from delegate and cache it if not found in cache', async () => {
        mockCache.get.mockReturnValue(undefined);
        delegate.findByTitle.mockResolvedValue(movie);

        const result = await repository.findByTitle(movieTitle);

        expect(result).toBe(movie);
        expect(mockCache.get).toHaveBeenCalledWith(movieTitle);
        expect(delegate.findByTitle).toHaveBeenCalledWith(movieTitle);
        expect(mockCache.set).toHaveBeenCalledWith(movieTitle, movie);
    });
});
