export abstract class Query {
    public readonly timestamp: Date;
    public readonly queryId: string;

    constructor(queryId: string) {
        this.queryId = queryId;
        this.timestamp = new Date()
    }
}