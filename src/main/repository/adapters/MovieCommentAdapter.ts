import {WithId} from "mongodb";
import {Comment} from "../../../../data/movies/Movie";
import {MongoMovieDetail} from "../CommentsRepository";

export const toDomainComment = (mongoMovieDetail: WithId<MongoMovieDetail>): Comment => {
    return {
        name: mongoMovieDetail.name,
        email: mongoMovieDetail.email,
        text: mongoMovieDetail.text
    }
}