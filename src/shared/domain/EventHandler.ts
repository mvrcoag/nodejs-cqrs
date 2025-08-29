import { DomainEvent } from "./Event";

export interface EventHandler<TEvent extends DomainEvent> {
    handle(event: TEvent): Promise<void>
}