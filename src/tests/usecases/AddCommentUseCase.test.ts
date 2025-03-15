import {Comment} from "../../../data/movies/Movie";
import {Builder} from "builder-pattern";
import {addCommentUseCase} from "../../main/usecases/AddCommentUseCase";
import {MovieDetailsRepository} from "../../main/repository/MovieDetailsRepository";

jest.mock('../../main/repository/Configuration');

describe('addCommentUseCase', () => {
    const movieId = '123';
    let movieDetailsRepository: jest.Mocked<MovieDetailsRepository>;

    beforeEach(() => {
        movieDetailsRepository = {
            findMovieDetail: jest.fn(),
            addComment: jest.fn()
        } as unknown as jest.Mocked<MovieDetailsRepository>
    })

    it('should add the comment properly', async () => {
        const comment = Builder<Comment>().build();

        const expected = {};
        (movieDetailsRepository.addComment as jest.Mock).mockResolvedValue(expected);
        const actual = await addCommentUseCase(comment, movieId, movieDetailsRepository);

        expect(movieDetailsRepository.addComment).toHaveBeenCalledWith(comment, movieId);
        expect(actual).toEqual(expected);
    });

    it('should throw an error when the repository fails', async () => {
        const comment = Builder<Comment>().build();

        const error = new Error('Repository failure');
        (movieDetailsRepository.addComment as jest.Mock).mockRejectedValue(error);

        await expect(addCommentUseCase(comment, movieId, movieDetailsRepository)).rejects.toThrow(error);
        expect(movieDetailsRepository.addComment).toHaveBeenCalledWith(comment, movieId);
    });
});
