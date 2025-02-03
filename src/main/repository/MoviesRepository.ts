import {Collection, MongoClient, ObjectId} from "mongodb";
import {Comment, Movie, MovieDetail} from "../../../data/movies/Movie";
import {toDomainMovie} from "./adapters/MoviesAdapter";
import {toDomainComment} from "./adapters/MovieCommentAdapter";
import {nowProvider} from "../utils/NowProvider";

interface Imdb {
    rating: number;
}

export interface MongoMovie {
    title: string;
    plot: string | undefined;
    fullplot: string | undefined;
    poster: string | undefined;
    year: number;
    genres: string[] | undefined;
    directors: string[] | undefined;
    imdb: Imdb;
    released: Date | undefined;
}

export interface MongoMovieDetail {
    text: string;
    email: string;
    name: string;
}

export class MoviesRepository {
    private mongoClient: MongoClient;
    private mongoMovieCollection: Collection<MongoMovie>;
    private mongoCommentsCollection: Collection<MongoMovieDetail>;
    private isConnected: boolean = false;
    private movieCountCache: number | null = null;

    constructor(host: string, db: string, username: string, password: string) {
        const uri = `mongodb+srv://${username}:${password}@${host}`;
        this.mongoClient = new MongoClient(uri);
        this.mongoMovieCollection = this.mongoClient.db(db).collection<MongoMovie>('movies');
        this.mongoCommentsCollection = this.mongoClient.db(db).collection<MongoMovieDetail>('comments');
    }

    private async connect(): Promise<void> {
        if (!this.isConnected) {
            await this.mongoClient.connect();
            this.isConnected = true;
        }
    }

    async disconnect(): Promise<void> {
        if (this.isConnected) {
            await this.mongoClient.close();
            this.isConnected = false;
        }
    }

    async countMovies(): Promise<number> {
        await this.connect();
        if (this.movieCountCache !== null) {
            console.log('Returning cached movie count');
            return this.movieCountCache;
        }
        const count = await this.mongoMovieCollection.countDocuments();
        this.movieCountCache = count;
        return count;
    }

    async findMovieDetail(id: string): Promise<MovieDetail> {
        try {
            await this.connect();
            const query = {movie_id: new ObjectId(id)};
            const result = await this.mongoCommentsCollection.find(query).limit(10).toArray();

            if (result) {
                return {
                    comments: result.map(comment => toDomainComment(comment))
                }
            } else {
                console.log(`No movies found with id "${id}"`);
                return {
                    comments: []
                };
            }
        } catch (error) {
            console.error('Error querying movie:', error);
            throw error;
        }
    }

    async findBy(page: number, pageSize: number): Promise<Movie[]> {
        try {
            await this.connect();
            const movies = await this.mongoMovieCollection
                .find({year: {$type: "int"}, poster: {$exists: true}})
                .sort({year: -1})
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .toArray();

            if (movies.length > 0) {
                return movies.map(m => {
                    return toDomainMovie(m)
                })
            } else {
                console.log('No movies found.');
            }

            return [];
        } catch (error) {
            console.error('Error retrieving first ten movies:', error);
            throw error;
        }
    }

    async findByTitle(title: string): Promise<Movie | null> {
        try {
            await this.connect();
            const movies = await this.mongoMovieCollection
                .find({title: {$regex: new RegExp(`^${title}$`, 'i')}})
                .limit(1)
                .toArray();

            if (movies.length > 0) {
                return toDomainMovie(movies[0])
            } else {
                console.log('No movies found.');
                return null;
            }
        } catch (error) {
            console.error('Error retrieving first ten movies:', error);
            return Promise.reject();
        }
    }

    async addComment(comment: Comment, movieId: string): Promise<any> {
        try {
            await this.connect();

            const newComment = {
                movie_id: new ObjectId(movieId),
                name: comment.name,
                email: comment.email,
                text: comment.text,
                date: nowProvider()
            };

            const result = await this.mongoCommentsCollection.insertOne(newComment);

            if (!result.acknowledged) {
                throw new Error("Failed to insert comment into database.");
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    }

}

export const moviesRepository = new MoviesRepository(
    process.env.MONGO_DB_HOST!,
    process.env.MONGO_DB_DATABASE!,
    process.env.MONGO_DB_USERNAME!,
    process.env.MONGO_DB_PASSWORD!,
);