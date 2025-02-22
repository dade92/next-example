import {Comment} from "../../../data/movies/Movie";
import {Builder} from "builder-pattern";
import {addCommentUseCase} from "../../main/usecases/AddCommentUseCase";
import {CommentsRepository} from "../../main/repository/CommentsRepository";

jest.mock('../../main/repository/Configuration');

describe('addCommentUseCase', () => {
    const movieId = '123';
    let commentsRepository: jest.Mocked<CommentsRepository>;

    beforeEach(() => {
        commentsRepository = {
            findMovieDetail: jest.fn(),
            addComment: jest.fn()
        } as unknown as jest.Mocked<CommentsRepository>
    })

    it('should add the comment properly', async () => {
        const comment = Builder<Comment>().build();

        const expected = {};
        (commentsRepository.addComment as jest.Mock).mockResolvedValue(expected);
        const actual = await addCommentUseCase(comment, movieId, commentsRepository);

        expect(commentsRepository.addComment).toHaveBeenCalledWith(comment, movieId);
        expect(actual).toEqual(expected);
    });

    it('should throw an error when the repository fails', async () => {
        const comment = Builder<Comment>().build();

        const error = new Error('Repository failure');
        (commentsRepository.addComment as jest.Mock).mockRejectedValue(error);

        await expect(addCommentUseCase(comment, movieId, commentsRepository)).rejects.toThrow(error);
        expect(commentsRepository.addComment).toHaveBeenCalledWith(comment, movieId);
    });
});
