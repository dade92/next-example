import {WithId} from "mongodb";
import {Movie} from "../../../data/movies/Movie";
import {MongoMovie} from "../MoviesRepository";

export const toDomainMovie = (mongoMovie: WithId<MongoMovie>): Movie => {
    return {
        id: mongoMovie._id.toString(),
        title: mongoMovie.title,
        plot: mongoMovie.plot ?? '',
        fullPlot: mongoMovie.fullplot ?? '',
        posterUrl: mongoMovie.poster ?? '',
        year: mongoMovie.year,
        genres: mongoMovie.genres ?? [],
        directors: mongoMovie.directors ?? [],
        rating: mongoMovie.imdb.rating
    }
}
