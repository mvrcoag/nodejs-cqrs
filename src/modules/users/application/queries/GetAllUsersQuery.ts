import { Query } from "@/shared/domain/Query";

export class GetAllUsersQuery extends Query {
    constructor(queryId: string) {
        super(queryId)
    }
}