import {toDomainMovie} from "../../../main/repository/adapters/MoviesAdapter";
import {ObjectId} from "mongodb";
import {Movie} from "../../../../data/movies/Movie";
import {Builder} from "builder-pattern";

describe('moviesAdapter', () => {
    it('should adapt correctly', () => {
        const releaseDate = new Date(2025, 0, 1);

        const actual = toDomainMovie({
            _id: ObjectId.createFromHexString('573a1390f29313caabcd63d6'),
            title: 'title',
            plot: 'plot',
            fullplot: 'fullPlot',
            poster: 'posterUrl',
            year: 1999,
            genres: ['drama', 'comedy'],
            directors: ['Nolan'],
            imdb: {
                rating: 6.5
            },
            released: releaseDate,
            trailerUrl: 'trailer'
        });

        expect(actual).toEqual(
            Builder<Movie>()
                .id('573a1390f29313caabcd63d6')
                .title('title')
                .plot('plot')
                .fullPlot('fullPlot')
                .posterUrl('posterUrl')
                .year(1999)
                .genres(['drama', 'comedy'])
                .directors(['Nolan'])
                .rating(6.5)
                .googleLink('https://google.com/search?q=title+movie+year:1999')
                .releaseDate(releaseDate)
                .trailer('trailer')
                .build()
        );
    });
});