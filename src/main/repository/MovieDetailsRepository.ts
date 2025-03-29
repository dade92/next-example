import {Collection, MongoClient, ObjectId} from "mongodb";
import {Comment, MovieDetail} from "../../../data/movies/Movie";
import {toDomainComment} from "./adapters/MovieCommentAdapter";
import {nowProvider} from "../utils/TimeProviders";

export interface MongoMovieDetail {
    text: string;
    email: string;
    name: string;
}

export class MovieDetailsRepository {
    private mongoClient: MongoClient;
    private mongoCommentsCollection: Collection<MongoMovieDetail>;
    private isConnected: boolean = false;
    private COMMENTS_LIMIT: number = 10;

    constructor(prefix: string, host: string, db: string, username: string, password: string) {
        const uri = `${prefix}://${username}:${password}@${host}`;
        this.mongoClient = new MongoClient(uri);
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

    async findMovieDetail(id: string): Promise<MovieDetail> {
        try {
            await this.connect();
            const query = {movie_id: new ObjectId(id)};
            const result = await this.mongoCommentsCollection
                .find(query)
                .limit(this.COMMENTS_LIMIT)
                .toArray();

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