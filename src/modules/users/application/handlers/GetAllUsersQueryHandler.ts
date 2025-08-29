import { QueryHandler } from "@/shared/domain/QueryHandler";
import { GetAllUsersQuery } from "../queries/GetAllUsersQuery";
import { UserReadModel } from "../../domain/UserReadModel";
import { UserReadRepository } from "../../domain/UserReadRepository";

export class GetAllUsersQueryHandler implements QueryHandler<GetAllUsersQuery, UserReadModel[]> {
    constructor(private userRepository: UserReadRepository) {}

    async handle(query: GetAllUsersQuery): Promise<UserReadModel[]> {
        return await this.userRepository.findAll()
    }
}