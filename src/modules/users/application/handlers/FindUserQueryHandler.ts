import { QueryHandler } from "@/shared/domain/QueryHandler";
import { FindUserQuery } from "../queries/FindUserQuery";
import { UserReadModel } from "../../domain/UserReadModel";
import { UserReadRepository } from "../../domain/UserReadRepository";

export class FindUserQueryHandler implements QueryHandler<FindUserQuery, UserReadModel> {
    constructor(private userRepository: UserReadRepository) {}

    async handle(query: FindUserQuery): Promise<UserReadModel> {
        const user = await this.userRepository.findById(query.userId)

        if (!user) {
            throw new Error(`User with id ${query.userId} not found`)
        }

        return user
    }
}