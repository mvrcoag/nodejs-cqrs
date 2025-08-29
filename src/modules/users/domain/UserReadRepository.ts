import { User } from "./User";
import { UserReadModel } from "./UserReadModel";

export interface UserReadRepository {
    findById(id: string): Promise<UserReadModel | null>
    findAll(): Promise<UserReadModel[]>
    findByEmail(email: string): Promise<UserReadModel | null>
    save(user: User): Promise<void>
}