import {Collection, MongoClient, ObjectId} from "mongodb";

export interface MongoUserDetail {
    name: string;
    email: string;
    password: string;
}

export interface User {
    username: string;
    password: string;
}

export class UserRepository {
    private mongoClient: MongoClient;
    private mongoUserCollection: Collection<MongoUserDetail>;
    private isConnected: boolean = false;

    constructor(host: string, db: string, username: string, password: string) {
        const uri = `mongodb+srv://${username}:${password}@${host}`;
        this.mongoClient = new MongoClient(uri);
        this.mongoUserCollection = this.mongoClient.db(db).collection<MongoUserDetail>('comments');
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
        username: string,
        email: string,
        password: string
    ): Promise<any> {
        try {
            await this.connect();

            const newUser = {
                _id: new ObjectId(),
                name: username,
                email: email,
                password: password
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
                .find({username: username})
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

const toDomainUser = (mongoUser: MongoUserDetail): User => {
    return {
        username: mongoUser.name,
        password: mongoUser.password
    }
}