import {toDomainMovie} from "../../../main/repository/adapters/MoviesAdapter";
import {ObjectId} from "mongodb";

describe('movieAdapter', () => {
    it('should adapt correctly', async () => {

        const result = toDomainMovie({
            _id: ObjectId.createFromTime(1),
            title: 'title',
            plot: 'plot',
            fullplot: undefined,
            poster: undefined,
            year: 1999,
            genres: undefined,
            directors: undefined,
            imdb: {
                rating: 6.5
            },
            released: new Date(2025, 2, 1),
        });

        expect(result).toEqual({
            id: '000000010000000000000000',
            title: 'title',
            plot: 'plot',
            fullPlot: '',
            posterUrl: '',
            year: 1999,
            genres: [],
            directors: [],
            rating: 6.5,
            googleLink: 'https://google.com/search?q=title+movie+year:1999',
            releaseDate: '01 Mar 2025',
        });
    });
});