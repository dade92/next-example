import {retrieveMovieDetailsUseCase} from "../../main/usecases/RetrieveMovieDetailUseCase";
import {MovieDetail} from "../../../data/movies/Movie";
import {Builder} from "builder-pattern";
import {MovieDetailsRepository} from "../../main/repository/MovieDetailsRepository";

describe('getMovieDetailsUseCase', () => {
    const movieId = '123';
    let movieDetailsRepository: jest.Mocked<MovieDetailsRepository>;

    beforeEach(() => {
        movieDetailsRepository = {
            findMovieDetail: jest.fn(),
            addComment: jest.fn()
        } as unknown as jest.Mocked<MovieDetailsRepository>
    })

    it('should return movie details for the given id', async () => {
        const response: MovieDetail = Builder<MovieDetail>().comments([
            {
                name: 'name',
                email: 'email',
                text: 'comment'
            }
        ]).build();

        (movieDetailsRepository.findMovieDetail as jest.Mock).mockResolvedValue(response);

        const result = await retrieveMovieDetailsUseCase(movieId, movieDetailsRepository);

        expect(movieDetailsRepository.findMovieDetail).toHaveBeenCalledWith(movieId);
        expect(result).toEqual(response);
    });

    it('should throw an error when the repository fails', async () => {
        const error = new Error('Repository failure');

        (movieDetailsRepository.findMovieDetail as jest.Mock).mockRejectedValue(error);

        await expect(retrieveMovieDetailsUseCase(movieId, movieDetailsRepository)).rejects.toThrow(error);
        expect(movieDetailsRepository.findMovieDetail).toHaveBeenCalledWith(movieId);
    });
});
