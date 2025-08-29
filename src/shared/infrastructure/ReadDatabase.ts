import { MongoClient, Db, Collection, Document } from 'mongodb'

export class ReadDatabase {
    private client: MongoClient | null = null
    private db: Db | null = null
    private initialized = false

    constructor(private connectionString: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/cqrs_read') {}

    public async initialize(): Promise<void> {
        if (this.initialized) return

        try {
            this.client = new MongoClient(this.connectionString)
            await this.client.connect()
            this.db = this.client.db()
            this.initialized = true
            console.log("Connected to MongoDB for read operations")
        } catch (error) {
            console.error(`MongoDB not avilable, ${String(error)}`)
        }
    }

    public getCollection<T extends Document>(name: string): Collection<T> {
        if (this.db) {
            return this.db.collection<T>(name)
        }

        throw new Error(`MongoDB not avilable`)
    }

    public async close(): Promise<void> {
        if (this.client) {
            await this.client.close()
        }
    }
}