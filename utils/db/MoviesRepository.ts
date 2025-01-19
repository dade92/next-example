import {Collection, MongoClient, ObjectId, WithId} from "mongodb";
import {Comment, Movie, MovieDetail} from "../movies/Movie";

interface MongoMovie {
    title: string;
    fullplot: string | undefined;
    poster: string | undefined;
}

interface MongoMovieDetail {
    text: string;
    email: string;
}

const toDomainMovie = (mongoMovie: WithId<MongoMovie>): Movie => {
    return {
        id: mongoMovie._id.toString(),
        title: mongoMovie.title,
        plot: mongoMovie.fullplot ?? '',
        posterUrl: mongoMovie.poster ?? ''
    }
}

const toDomainComment = (mongoMovieDetail: WithId<MongoMovieDetail>): Comment => {
    return {
        email: mongoMovieDetail.email,
        text: mongoMovieDetail.text
    }
}

export class MoviesRepository {
    private mongoClient: MongoClient;
    private mongoMovieCollection: Collection<MongoMovie>;
    private mongoCommentsCollection: Collection<MongoMovieDetail>;
    private isConnected: boolean = false;

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

    async query(name: string): Promise<Movie | null> {
        try {
            await this.connect();
            const query = {name};
            const result = await this.mongoCommentsCollection.find(query);

            if (result) {
                console.log(`Found one movie with name "${name}":`, result);
            } else {
                console.log(`No movies found with name "${name}"`);
            }

            return null;
        } catch (error) {
            console.error('Error querying movie:', error);
            throw error;
        }
    }

    async findDetail(id: string): Promise<MovieDetail> {
        try {
            await this.connect();
            const query = {movie_id: new ObjectId(id)};
            const result = await this.mongoCommentsCollection.find(query).limit(10).toArray();

            if (result) {
                return {
                    comments: result.map(comment => toDomainComment(comment))
                }
            } else {
                console.log(`No movies found with name "${name}"`);
                return {
                    comments: []
                };
            }
        } catch (error) {
            console.error('Error querying movie:', error);
            throw error;
        }
    }

    async findFirstTen(): Promise<Movie[]> {
        try {
            await this.connect();
            const movies = await this.mongoMovieCollection.find().limit(10).toArray();

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

}

export const moviesRepository = new MoviesRepository(
    process.env.MONGO_DB_HOST!,
    process.env.MONGO_DB_DATABASE!,
    process.env.MONGO_DB_USERNAME!,
    process.env.MONGO_DB_PASSWORD!,
);