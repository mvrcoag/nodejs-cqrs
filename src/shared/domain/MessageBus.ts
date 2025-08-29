import { CommandHandler } from "./CommandHandler";
import { Command } from "./Command";
import { QueryHandler } from "./QueryHandler";
import { Query } from "./Query";
import { DomainEvent } from "./Event";
import { EventHandler } from "./EventHandler";

export interface MessageBus {
    registerCommandHandler<TCommand extends Command>(name: string, handler: CommandHandler<TCommand>): void
    registerQueryHandler<TQuery extends Query, TResult>(name: string, handler: QueryHandler<TQuery, TResult>): void
    registerEventHandler<TEvent extends DomainEvent>(name: string, handler: EventHandler<TEvent>[]): void
    executeCommand<TCommand extends Command>(command: TCommand): Promise<void>
    executeQuery<TQuery extends Query, TResult>(query: TQuery): Promise<TResult>
    publishEvent<TEvent extends DomainEvent>(event: TEvent): Promise<void>
    publishEventAsync<TEvent extends DomainEvent>(event: TEvent): void
    processEventQueue(): void
    drainEventQueue(): Promise<void>
    getQueueStatus(): { queueSize: number, isProcessing: boolean }
}