export abstract class DomainEvent {
    public readonly eventId: string;
    public readonly ocurredAt: Date;
    public readonly aggregateId: string;
    public readonly eventType: string;

    constructor(eventId: string, aggregateId: string, eventType: string) {
        this.eventId = eventId
        this.aggregateId = aggregateId
        this.eventType = eventType
        this.ocurredAt = new Date()
    }

}