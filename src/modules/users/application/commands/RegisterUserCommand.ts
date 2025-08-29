import { Command } from "@/shared/domain/Command";

export class RegisterUserCommand extends Command {
    constructor(
        commandId: string,
        public readonly userId: string,
        public readonly email: string,
        public readonly name: string
    ) {
        super(commandId)
    }
}