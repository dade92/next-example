import {Collection, MongoClient, ObjectId} from "mongodb";
import {Movie} from "../../../data/movies/Movie";
import {toDomainMovie} from "./adapters/MoviesAdapter";

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
    trailer: string | undefined;
}

export class MoviesRepository {
    private mongoClient: MongoClient;
    private mongoMovieCollection: Collection<MongoMovie>;
    private isConnected: boolean = false;
    private movieCountCache: number | null = null;

    constructor(prefix: string, host: string, db: string, username: string, password: string) {
        const uri = `${prefix}://${username}:${password}@${host}`;
        this.mongoClient = new MongoClient(uri);
        this.mongoMovieCollection = this.mongoClient.db(db).collection<MongoMovie>('movies');
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

    async findById(id: string): Promise<Movie> {
        try {
            await this.connect();
            const movies = await this.mongoMovieCollection
                .find({_id: new ObjectId(id)})
                .toArray();

            if (movies.length > 0) {
                return toDomainMovie(movies[0])
            } else {
                console.log('No movies found.');
            }

            return Promise.reject();
        } catch (error) {
            console.error('Error retrieving first ten movies:', error);
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
}