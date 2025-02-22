import {CommentsRepository} from "./CommentsRepository";
import {MoviesRepository} from "./MoviesRepository";
import {UserRepository} from "./UserRepository";
import {SessionRepository} from "./SessionRepository";
import {CachedSessionRepository} from "./CachedSessionRepository";
import {CachedMoviesRepository} from "./CachedMoviesRepository";

export const commentsRepository = new CommentsRepository(
    process.env.MONGO_DB_PREFIX!,
    process.env.MONGO_DB_HOST!,
    process.env.MONGO_DB_DATABASE!,
    process.env.MONGO_DB_USERNAME!,
    process.env.MONGO_DB_PASSWORD!,
);

export const moviesRepository =
    new CachedMoviesRepository(
        new MoviesRepository(
            process.env.MONGO_DB_PREFIX!,
            process.env.MONGO_DB_HOST!,
            process.env.MONGO_DB_DATABASE!,
            process.env.MONGO_DB_USERNAME!,
            process.env.MONGO_DB_PASSWORD!,
        )
    );

export const usersRepository = new UserRepository(
    process.env.MONGO_DB_PREFIX!,
    process.env.MONGO_DB_HOST!,
    process.env.MONGO_DB_DATABASE!,
    process.env.MONGO_DB_USERNAME!,
    process.env.MONGO_DB_PASSWORD!,
);

export const sessionRepository =
    new CachedSessionRepository(
        new SessionRepository(
            process.env.MONGO_DB_PREFIX!,
            process.env.MONGO_DB_HOST!,
            process.env.MONGO_DB_DATABASE!,
            process.env.MONGO_DB_USERNAME!,
            process.env.MONGO_DB_PASSWORD!,
        )
    )
;