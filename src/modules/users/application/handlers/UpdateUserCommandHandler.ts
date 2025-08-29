import { CommandHandler } from "@/shared/domain/CommandHandler";
import { UpdateUserCommand } from "../commands/UpdateUserCommand";
import { UserWriteRepository } from "../../domain/UserWriteRepository";
import { MessageBus } from "@/shared/domain/MessageBus";
import { UserUpdatedEvent } from "../../domain/User";
import { v4 } from "uuid";

export class UpdateUserCommandHandler implements CommandHandler<UpdateUserCommand> {
    constructor(
        private userRepository: UserWriteRepository,
        private messageBus: MessageBus
    ) {}

    async handle(command: UpdateUserCommand): Promise<void> {
        const user = await this.userRepository.findById(command.userId)
        if (!user) {
            throw new Error(`User with id ${command.userId} not found`)
        }

        const updatedUser = user.updateName(command.name)
        await this.userRepository.save(updatedUser)

        const event = new UserUpdatedEvent(v4(), updatedUser.id, updatedUser.email, updatedUser.name)

        this.messageBus.publishEventAsync(event)
    }
}