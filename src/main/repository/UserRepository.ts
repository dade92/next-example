import {Collection, MongoClient, ObjectId} from "mongodb";
import {User} from "../../../data/users/User";
import {nowProvider} from "../utils/TimeProviders";

export interface MongoUserDetail {
    name: string;
    email: string;
    password: string;
    creationDate: Date;
};

export class UserRepository {
    private mongoClient: MongoClient;
    private mongoUserCollection: Collection<MongoUserDetail>;
    private isConnected: boolean = false;

    constructor(prefix: string, host: string, db: string, username: string, password: string) {
        const uri = `${prefix}://${username}:${password}@${host}`;
        this.mongoClient = new MongoClient(uri);
        this.mongoUserCollection = this.mongoClient.db(db).collection<MongoUserDetail>('users');
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

    async addUser(
        user: User
    ): Promise<any> {
        try {
            await this.connect();

            const newUser = {
                _id: new ObjectId(),
                name: user.username,
                email: user.email,
                password: user.password,
                creationDate: nowProvider()
            };

            const result = await this.mongoUserCollection.insertOne(newUser);

            if (!result.acknowledged) {
                throw new Error("Failed to insert comment into database.");
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    }

    async findUserByUsername(username: string): Promise<User | null> {
        try {
            await this.connect();
            const user = await this.mongoUserCollection
                .find({name: username})
                .limit(1)
                .toArray();

            if (user.length > 0) {
                return toDomainUser(user[0])
            } else {
                console.log('No movies found.');
                return null;
            }
        } catch (error) {
            console.error(`No user with username ${username} found:`, error);
            return Promise.reject();
        }
    }

}

const toDomainUser = (mongoUser: MongoUserDetail): User => ({
    username: mongoUser.name,
    password: mongoUser.password,
    email: mongoUser.email
})