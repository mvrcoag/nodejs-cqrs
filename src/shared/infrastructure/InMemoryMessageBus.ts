import { Command } from "../domain/Command";
import { CommandHandler } from "../domain/CommandHandler";
import { DomainEvent } from "../domain/Event";
import { EventHandler } from "../domain/EventHandler";
import { MessageBus } from "../domain/MessageBus";
import { Query } from "../domain/Query";
import { QueryHandler } from "../domain/QueryHandler";

export class InMemoryMessageBus implements MessageBus {
    private commandHandlers = new Map<string, CommandHandler<any>>();
    private queryHandlers = new Map<string, QueryHandler<any, any>>();
    private eventHandlers = new Map<string, EventHandler<any>[]>();
    private eventQueue: DomainEvent[] = []
    private isProcessingQueue = false

    public registerCommandHandler<TCommand extends Command>(name: string, handler: CommandHandler<TCommand>): void {
        this.commandHandlers.set(name, handler)
    }

    public registerQueryHandler<TQuery extends Query, TResult>(name: string, handler: QueryHandler<TQuery, TResult>): void {
        this.queryHandlers.set(name, handler)
    }

    public registerEventHandler<TEvent extends DomainEvent>(name: string, handler: EventHandler<TEvent>[]): void {
        this.eventHandlers.set(name, handler)
    }

    public async executeCommand<TCommand extends Command>(command: TCommand): Promise<void> {
        const commandName = command.constructor.name
        const handler = this.commandHandlers.get(commandName)

        if (!handler) {
            throw new Error(`No handler registered for command: ${commandName}`)
        }

        await handler.handle(command)
    }

    public async executeQuery<TQuery extends Query, TResult>(query: TQuery): Promise<TResult> {
        const queryName = query.constructor.name
        const handler = this.queryHandlers.get(queryName)

        if (!handler) {
            throw new Error(`No handler registered for query: ${queryName}`)
        }

        return await handler.handle(query)
    }

    public async publishEvent<TEvent extends DomainEvent>(event: TEvent): Promise<void> {
        const eventName = event.constructor.name
        const handlers = this.eventHandlers.get(eventName) || []

        const promises = handlers.map(handler => handler.handle(event))
        await Promise.all(promises)
    }

    public publishEventAsync<TEvent extends DomainEvent>(event: TEvent): void {
        this.eventQueue.push(event)
        this.processEventQueue()
    }

    public processEventQueue(): void {
        if (this.isProcessingQueue) {
            return;
        }

        this.isProcessingQueue = true

        setImmediate(async () => {
            try {
                while(this.eventQueue.length > 0) {
                    const event = this.eventQueue.shift()
                    if (event) {
                        try {
                            await this.publishEvent(event)
                            console.log(`✅ Event processed: ${event.eventType} (${event.eventId})`)
                        } catch (error) {
                            console.error(`❌ Failed to process event: ${event.eventType} (${event.eventId})`, error)
                        }
                    }
                }
            } finally {
                this.isProcessingQueue = false
            }
        })
    }

    public async drainEventQueue(): Promise<void> {
        console.log(`Draining event queue... (${this.eventQueue.length} events)`)

        while (this.eventQueue.length > 0 || this.isProcessingQueue) {
            await new Promise(resolve => setTimeout(resolve, 10))
        }

        console.log(`Event queue drained`)
    }

    public getQueueStatus(): { queueSize: number; isProcessing: boolean; } {
        return {
            queueSize: this.eventQueue.length,
            isProcessing: this.isProcessingQueue
        }
    }
}