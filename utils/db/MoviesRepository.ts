import {Collection, MongoClient} from "mongodb";
import {Movie} from "../../pages/movies2";

export class MoviesRepository {
    private mongoClient: MongoClient;
    private collection: Collection<Movie>;
    private isConnected: boolean = false;

    constructor(host: string, port: string, db: string, username: string, password: string) {
        const uri = `mongodb+srv://${username}:${password}@${host}:${port}`;
        this.mongoClient = new MongoClient(uri);
        this.collection = this.mongoClient.db(db).collection<Movie>('movies');
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
            const result = await this.collection.findOne(query);

            if (result) {
                console.log(`Found one movie with name "${name}":`, result);
            } else {
                console.log(`No movies found with name "${name}"`);
            }

            return result;
        } catch (error) {
            console.error('Error querying movie:', error);
            throw error;
        }
    }

    async findFirstTen(): Promise<Movie[]> {
        try {
            await this.connect();
            const movies = await this.collection.find().limit(10).toArray();

            if (movies.length > 0) {
                console.log(`Found ${movies.length} movies:`, movies);
            } else {
                console.log('No movies found.');
            }

            return movies;
        } catch (error) {
            console.error('Error retrieving first ten movies:', error);
            throw error;
        }
    }

}

export const moviesRepository = new MoviesRepository(
    'cluster0.0ehgf.mongodb.net',
    '27017',
    'sample_mflix',
    'davidebotti92',
    ''
);