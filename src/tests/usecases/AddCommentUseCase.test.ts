import {Comment} from "../../../data/movies/Movie";
import {Builder} from "builder-pattern";
import {addCommentUseCase} from "../../main/usecases/AddCommentUseCase";
import {commentsRepository} from "../../main/repository/CommentsRepository";

jest.mock('../../main/repository/CommentsRepository');

describe('addCommentUseCase', () => {
    it('should add the comment properly', async () => {
        const comment = Builder<Comment>().build();
        const movieId = '123';

        const expected = {};
        (commentsRepository.addComment as jest.Mock).mockResolvedValue(expected);
        const actual = await addCommentUseCase(comment, movieId);

        expect(commentsRepository.addComment).toHaveBeenCalledWith(comment, movieId);
        expect(actual).toEqual(expected);
    });

    it('should throw an error when the repository fails', async () => {
        const comment = Builder<Comment>().build();
        const movieId = '123';

        const error = new Error('Repository failure');
        (commentsRepository.addComment as jest.Mock).mockRejectedValue(error);

        await expect(addCommentUseCase(comment, movieId)).rejects.toThrow(error);
        expect(commentsRepository.addComment).toHaveBeenCalledWith(comment, movieId);
    });
});
