import { EventHandler } from "@/shared/domain/EventHandler";
import { User, UserUpdatedEvent } from "../../domain/User";
import { UserReadRepository } from "../../domain/UserReadRepository";

export class UserUpdatedEventHandler implements EventHandler<UserUpdatedEvent> {
    constructor(private userRepository: UserReadRepository) {}

    async handle(event: UserUpdatedEvent): Promise<void> {
        const user = User.create(event.userId, event.email, event.name)
        await this.userRepository.save(user)
    }
}