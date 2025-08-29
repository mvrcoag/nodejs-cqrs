import { EventHandler } from "@/shared/domain/EventHandler";
import { User, UserRegisteredEvent } from "../../domain/User";
import { UserReadRepository } from "../../domain/UserReadRepository";

export class UserRegisteredEventHandler implements EventHandler<UserRegisteredEvent> {
    constructor(private userRepository: UserReadRepository) {}

    async handle(event: UserRegisteredEvent): Promise<void> {
        const user = User.create(event.userId, event.email, event.name)
        await this.userRepository.save(user)
    }
}