import { Query } from "./Query";

export interface QueryHandler<TQuery extends Query, TResult> {
    handle(query: TQuery): Promise<TResult>
}