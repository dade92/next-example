import {WithId} from "mongodb";
import {Comment} from "../movies/Movie";
import {MongoMovieDetail} from "./MoviesRepository";

export const toDomainComment = (mongoMovieDetail: WithId<MongoMovieDetail>): Comment => {
    return {
        email: mongoMovieDetail.email,
        text: mongoMovieDetail.text
    }
}