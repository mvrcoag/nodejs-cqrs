import { Query } from "@/shared/domain/Query";

export class FindUserQuery extends Query {
    constructor(queryId: string, public readonly userId: string) {
        super(queryId)
    }
}