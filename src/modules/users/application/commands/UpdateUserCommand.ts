import { Command } from "@/shared/domain/Command";

export class UpdateUserCommand extends Command {
    constructor(
        commandId: string,
        public readonly userId: string,
        public readonly name: string
    ) {
        super(commandId)
    }
}