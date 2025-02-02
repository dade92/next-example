import {moviesRepository} from "../../main/repository/MoviesRepository";
import {Comment} from "../../../data/movies/Movie";
import {Builder} from "builder-pattern";
import {addCommentUseCase} from "../../main/usecases/AddCommentUseCase";

jest.mock('../../main/repository/MoviesRepository');

describe('searchMovieUseCase', () => {
    it('should add the comment properly', async () => {
        const comment = Builder<Comment>().build();
        const movieId = '123';

        const expected = Promise.resolve();
        (moviesRepository.addComment as jest.Mock).mockResolvedValue(expected);
        const actual = await addCommentUseCase(comment, movieId);

        expect(moviesRepository.addComment).toHaveBeenCalledWith(comment, movieId);
        expect(actual).toEqual(expected);
    });
});
