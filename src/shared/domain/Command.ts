export abstract class Command {
    public readonly timestamp: Date;
    public readonly commandId: string;

    constructor(commandId: string) {
        this.commandId = commandId;
        this.timestamp = new Date()
    }
}