import sqlite3 from 'sqlite3'
import { promisify } from 'util'

export class WriteDatabase {
    private db: sqlite3.Database
    private initialized: boolean = false

    constructor(private dbPath: string = ":memory:") {
        this.db = new sqlite3.Database(this.dbPath)
    }

    public async initialize(): Promise<void> {
        if (this.initialized) return

        const run = promisify(this.db.run.bind(this.db))

        await run(`
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
            `)

        this.initialized = true
    }

    public async run(sql: string, params: any[] = []): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, (err) => {
                if (err) reject(err)
                else resolve()
            })
        })
    }

    public async get(sql: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) reject(err)
                else resolve(row)
            })
        })
    }

    public async close(): Promise<void> {
        const close = promisify(this.db.close.bind(this.db))
        await close()
    }
}