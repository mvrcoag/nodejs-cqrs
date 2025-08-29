import { CommandHandler } from "@/shared/domain/CommandHandler";
import { UserWriteRepository } from "../../domain/UserWriteRepository";
import { RegisterUserCommand } from "../commands/RegisterUserCommand";
import { User, UserRegisteredEvent } from "../../domain/User";
import { MessageBus } from "@/shared/domain/MessageBus";
import { v4 } from "uuid";

export class RegisterUserCommandHandler implements CommandHandler<RegisterUserCommand> {
    constructor(
        private userRepository: UserWriteRepository,
        private messageBus: MessageBus
    ) {}

    async handle(command: RegisterUserCommand): Promise<void> {
        const existingUser = await this.userRepository.findByEmail(command.email)
        if (existingUser) {
            throw new Error(`User with email ${command.email} already exists`)
        }

        const user = User.create(command.userId, command.email, command.name)
        await this.userRepository.save(user)

        const event = new UserRegisteredEvent(v4(), user.id, user.email, user.name)

        this.messageBus.publishEventAsync(event)
    }
}