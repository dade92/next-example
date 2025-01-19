import {WithId} from "mongodb";
import {Movie} from "../movies/Movie";
import {MongoMovie} from "./MoviesRepository";

export const toDomainMovie = (mongoMovie: WithId<MongoMovie>): Movie => {
    return {
        id: mongoMovie._id.toString(),
        title: mongoMovie.title,
        plot: mongoMovie.fullplot ?? '',
        posterUrl: mongoMovie.poster ?? '',
        year: mongoMovie.year,
    }
}
