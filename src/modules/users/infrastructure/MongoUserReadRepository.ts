import { ReadDatabase } from "@/shared/infrastructure/ReadDatabase";
import { UserReadRepository } from "../domain/UserReadRepository";
import { UserReadModel } from "../domain/UserReadModel";
import { User } from "../domain/User";

export class MongoUserReadRepository implements UserReadRepository {
    constructor(private readDatabase: ReadDatabase) {}

    async findById(id: string): Promise<UserReadModel | null> {
        const collection = this.readDatabase.getCollection<UserReadModel>("users")
        const user = await collection.findOne({id})
        return user
    }

    async findAll(): Promise<UserReadModel[]> {
        const collection = this.readDatabase.getCollection<UserReadModel>('users')
        const result = collection.find({})
        return await result.toArray()
    }

    async findByEmail(email: string): Promise<UserReadModel | null> {
        const collection = this.readDatabase.getCollection<UserReadModel>('users')
        const user = await collection.findOne({email})
        return user
    }

    async save(user: User): Promise<void> {
        const userExists = await this.findById(user.id)
        const collection = this.readDatabase.getCollection<UserReadModel>('users')

        if (userExists) {
            await collection.updateOne(
                { id: user.id },
                {
                    $set: {
                        name: user.name,
                        updatedAt: user.updatedAt
                    }
                }
            )
        } else {
            await collection.insertOne({
                id: user.id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            })
        }

    }
}