import { DomainEvent } from "@/shared/domain/Event"

export class User {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly name: string,
        public readonly createdAt: Date = new Date(),
        public readonly updatedAt: Date = new Date(),
    ) {}

    public static create(id: string, email: string, name: string) {
        return new User(id, email, name)
    }

    public updateName(newName: string) {
        return new User(this.id, this.email, newName, this.createdAt, new Date())
    }
}

export class UserRegisteredEvent extends DomainEvent {
    constructor(
        eventId: string,
        public readonly userId: string,
        public readonly email: string,
        public readonly name: string
    ) {
        super(eventId, userId, 'UserRegisteredEvent')
    }
}

export class UserUpdatedEvent extends DomainEvent {
        constructor(
        eventId: string,
        public readonly userId: string,
        public readonly email: string,
        public readonly name: string
    ) {
        super(eventId, userId, 'UserUpdatedEvent')
    }
}