import {retrieveMovieDetailsUseCase} from "../../main/usecases/RetrieveMovieDetailUseCase";
import {MovieDetail} from "../../../data/movies/Movie";
import {Builder} from "builder-pattern";
import {CommentsRepository} from "../../main/repository/CommentsRepository";

describe('getMovieDetailsUseCase', () => {
    const movieId = '123';
    let commentsRepository: jest.Mocked<CommentsRepository>;

    beforeEach(() => {
        commentsRepository = {
            findMovieDetail: jest.fn(),
            addComment: jest.fn()
        } as unknown as jest.Mocked<CommentsRepository>
    })

    it('should return movie details for the given id', async () => {
        const response: MovieDetail = Builder<MovieDetail>().comments([
            {
                name: 'name',
                email: 'email',
                text: 'comment'
            }
        ]).build();

        (commentsRepository.findMovieDetail as jest.Mock).mockResolvedValue(response);

        const result = await retrieveMovieDetailsUseCase(movieId, commentsRepository);

        expect(commentsRepository.findMovieDetail).toHaveBeenCalledWith(movieId);
        expect(result).toEqual(response);
    });

    it('should throw an error when the repository fails', async () => {
        const error = new Error('Repository failure');

        (commentsRepository.findMovieDetail as jest.Mock).mockRejectedValue(error);

        await expect(retrieveMovieDetailsUseCase(movieId, commentsRepository)).rejects.toThrow(error);
        expect(commentsRepository.findMovieDetail).toHaveBeenCalledWith(movieId);
    });
});
