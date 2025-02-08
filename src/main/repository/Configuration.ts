import {CommentsRepository} from "./CommentsRepository";
import {MoviesRepository} from "./MoviesRepository";

export const commentsRepository = new CommentsRepository(
    process.env.MONGO_DB_HOST!,
    process.env.MONGO_DB_DATABASE!,
    process.env.MONGO_DB_USERNAME!,
    process.env.MONGO_DB_PASSWORD!,
);

export const moviesRepository = new MoviesRepository(
    process.env.MONGO_DB_HOST!,
    process.env.MONGO_DB_DATABASE!,
    process.env.MONGO_DB_USERNAME!,
    process.env.MONGO_DB_PASSWORD!,
);