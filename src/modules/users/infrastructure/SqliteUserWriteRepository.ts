import { WriteDatabase } from "@/shared/infrastructure/WriteDatabase";
import { UserWriteRepository } from "../domain/UserWriteRepository";
import { User } from "../domain/User";

export class SqliteUserWriteRepository implements UserWriteRepository {
    constructor(private writeDatabase: WriteDatabase) {}

    async save(user: User): Promise<void> {
        const existingUser = await this.findById(user.id)

        if (existingUser) {
            await this.writeDatabase.run(
                'UPDATE users SET name = ?, updated_at = ? WHERE id = ?',
                [user.name, user.updatedAt.toISOString(), user.id]
            )
        } else {
            await this.writeDatabase.run(
                'INSERT INTO users (id, email, name, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
                [user.id, user.email, user.name, user.createdAt.toISOString(), user.updatedAt.toISOString()]
            )
        }
    }

    async findById(id: string): Promise<User | null> {
        const row = await this.writeDatabase.get(`
            SELECT * FROM users WHERE id = ?
            `, [id])

        if (!row) return null

        return new User(
            row.id,
            row.email,
            row.name,
            new Date(row.created_at),
            new Date(row.updated_at)
        )
    }

    async findByEmail(email: string): Promise<User | null> {
        const row = await this.writeDatabase.get(
            'SELECT * FROM users WHERE email = ?', [email]
        )

        if (!row) return null

        return new User(
            row.id,
            row.email,
            row.name,
            new Date(row.created_at),
            new Date(row.updated_at)
        )
    }
}