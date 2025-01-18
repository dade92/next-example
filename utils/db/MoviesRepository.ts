import {Collection, MongoClient, WithId} from "mongodb";
import {Movie2} from "../../pages/mflix";

interface MongoMovie {
    title: string;
    plot: string;
    poster: string | undefined;
}

const toDomainMovie = (mongoMovie: WithId<MongoMovie>): Movie2 => {
    return {
        id: mongoMovie._id.toString(),
        title: mongoMovie.title,
        plot: mongoMovie.plot,
        posterUrl: mongoMovie.poster ?? ''
    }
}

export class MoviesRepository {
    private mongoClient: MongoClient;
    private collection: Collection<MongoMovie>;
    private isConnected: boolean = false;

    constructor(host: string, db: string, username: string, password: string) {
        const uri = `mongodb+srv://${username}:${password}@${host}`;
        this.mongoClient = new MongoClient(uri);
        this.collection = this.mongoClient.db(db).collection<MongoMovie>('movies');
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

    async query(name: string): Promise<Movie2 | null> {
        try {
            await this.connect();
            const query = {name};
            const result = await this.collection.findOne(query);

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

    async findFirstTen(): Promise<Movie2[]> {
        try {
            await this.connect();
            const movies = await this.collection.find().limit(10).toArray();

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