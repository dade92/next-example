import {retrieveMovieDetailsUseCase} from "../../main/usecases/RetrieveMovieDetailUseCase";
import {MovieDetail} from "../../../data/movies/Movie";
import {Builder} from "builder-pattern";
import {commentsRepository} from "../../main/repository/Configuration";

jest.mock('../../main/repository/Configuration');

describe('getMovieDetailsUseCase', () => {
    const movieId = '123';

    it('should return movie details for the given id', async () => {
        const response: MovieDetail = Builder<MovieDetail>().comments([
            {
                name: 'name',
                email: 'email',
                text: 'comment'
            }
        ]).build();

        (commentsRepository.findMovieDetail as jest.Mock).mockResolvedValue(response);

        const result = await retrieveMovieDetailsUseCase(movieId);

        expect(commentsRepository.findMovieDetail).toHaveBeenCalledWith(movieId);
        expect(result).toEqual(response);
    });

    it('should throw an error when the repository fails', async () => {
        const error = new Error('Repository failure');

        (commentsRepository.findMovieDetail as jest.Mock).mockRejectedValue(error);

        await expect(retrieveMovieDetailsUseCase(movieId)).rejects.toThrow(error);
        expect(commentsRepository.findMovieDetail).toHaveBeenCalledWith(movieId);
    });
});
