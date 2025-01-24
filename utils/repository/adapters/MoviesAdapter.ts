import {WithId} from "mongodb";
import {Movie} from "../../../data/movies/Movie";
import {MongoMovie} from "../MoviesRepository";
import {format} from "date-fns";

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
        rating: mongoMovie.imdb.rating,
        googleLink: adaptGoogleLink(mongoMovie.title),
        releaseDate: adaptDate(mongoMovie.released)
    }
}

const adaptGoogleLink = (title: string) => {
    return `https://google.com/search?q=${title.split(" ").join("+")}`
}

const adaptDate = (date: Date | undefined): string | null => {
    if (date != undefined)
        return format(date, 'dd/MM/yyyy')
    else
        return null
}
