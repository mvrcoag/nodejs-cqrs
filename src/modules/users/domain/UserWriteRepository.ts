import { User } from "./User";

export interface UserWriteRepository {
    save(user: User): Promise<void>
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
}