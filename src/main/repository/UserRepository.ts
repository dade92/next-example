import {Collection, MongoClient} from "mongodb";

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

    async findUserByUsername(username: string): Promise<User> {
        return Promise.resolve({username: '', password: ''})
    }

}