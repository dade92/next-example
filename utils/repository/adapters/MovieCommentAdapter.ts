import {WithId} from "mongodb";
import {Comment} from "../../../data/movies/Movie";
import {MongoMovieDetail} from "../MoviesRepository";

export const toDomainComment = (mongoMovieDetail: WithId<MongoMovieDetail>): Comment => {
    return {
        name: mongoMovieDetail.name,
        email: mongoMovieDetail.email,
        text: mongoMovieDetail.text
    }
}