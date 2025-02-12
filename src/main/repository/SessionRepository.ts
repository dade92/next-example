import {Collection, MongoClient, ObjectId} from "mongodb";
import {Session} from "../../../data/session/Session";

interface MongoSession {
    username: string;
    sessionToken: string;
    expirationDate: Date;
}

export class SessionRepository {
    private mongoClient: MongoClient;
    private mongoSessionCollection: Collection<MongoSession>;
    private isConnected: boolean = false;

    constructor(host: string, db: string, username: string, password: string) {
        const uri = `mongodb+srv://${username}:${password}@${host}`;
        this.mongoClient = new MongoClient(uri);
        this.mongoSessionCollection = this.mongoClient.db(db).collection<MongoSession>('users');
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

    async addSession(
        session: Session
    ): Promise<any> {
        try {
            await this.connect();

            const newSession = {
                _id: new ObjectId(),
                username: session.username,
                sessionToken: session.sessionToken,
                expirationDate: session.expirationDate
            };

            const result = await this.mongoSessionCollection.insertOne(newSession);

            if (!result.acknowledged) {
                throw new Error("Failed to insert comment into database.");
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    }

    async findSession(token: string): Promise<Session | null> {
        try {
            await this.connect();
            const session = await this.mongoSessionCollection.findOne({sessionToken: token});
            if (session) {
                return toDomainSession(session);
            } else {
                return Promise.reject()
            }
        } catch (error) {
            console.error('Error finding session:', error);
            throw error;
        }
    }
}

const toDomainSession = (mongoSession: MongoSession): Session => {
    return {
        username: mongoSession.username,
        sessionToken: mongoSession.sessionToken,
        expirationDate: mongoSession.expirationDate
    }
}