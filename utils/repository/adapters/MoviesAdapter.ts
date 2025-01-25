import {WithId} from "mongodb";
import {Movie} from "../../../data/movies/Movie";
import {MongoMovie} from "../MoviesRepository";
import {format} from "date-fns";

export const toDomainMovie = (mongoMovie: WithId<MongoMovie>): Movie => ({
    id: mongoMovie._id.toString(),
    title: mongoMovie.title,
    plot: mongoMovie.plot ?? '',
    fullPlot: mongoMovie.fullplot ?? '',
    posterUrl: mongoMovie.poster ?? '',
    year: mongoMovie.year,
    genres: mongoMovie.genres ?? [],
    directors: mongoMovie.directors ?? [],
    rating: mongoMovie.imdb.rating,
    googleLink: `https://google.com/search?q=${mongoMovie.title.split(" ").join("+") + '+movie'}`,
    releaseDate: mongoMovie.released ? format(mongoMovie.released, 'dd MMM yyyy') : ''
})