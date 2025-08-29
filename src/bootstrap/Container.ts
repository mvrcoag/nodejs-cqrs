import { UserRegisteredEventHandler } from "@/modules/users/application/eventHandlers/UserRegisteredEventHandler";
import { UserUpdatedEventHandler } from "@/modules/users/application/eventHandlers/UserUpdatedEventHandler";
import { FindUserQueryHandler } from "@/modules/users/application/handlers/FindUserQueryHandler";
import { GetAllUsersQueryHandler } from "@/modules/users/application/handlers/GetAllUsersQueryHandler";
import { RegisterUserCommandHandler } from "@/modules/users/application/handlers/RegisterUserCommandHandler";
import { UpdateUserCommandHandler } from "@/modules/users/application/handlers/UpdateUserCommandHandler";
import { MongoUserReadRepository } from "@/modules/users/infrastructure/MongoUserReadRepository";
import { SqliteUserWriteRepository } from "@/modules/users/infrastructure/SqliteUserWriteRepository";
import { MessageBus } from "@/shared/domain/MessageBus";
import { InMemoryMessageBus } from "@/shared/infrastructure/InMemoryMessageBus";
import { ReadDatabase } from "@/shared/infrastructure/ReadDatabase";
import { WriteDatabase } from "@/shared/infrastructure/WriteDatabase";

export class Container {
  public messageBus: MessageBus;
  public writeDatabase: WriteDatabase;
  public readDatabase: ReadDatabase;

  constructor() {
    this.messageBus = new InMemoryMessageBus();
    this.writeDatabase = new WriteDatabase();
    this.readDatabase = new ReadDatabase();
  }

  public async initiliaze(): Promise<void> {
    await this.writeDatabase.initialize();
    await this.readDatabase.initialize();
    this.registerHandlers();
  }

  public registerHandlers(): void {
    const userWriteRepository = new SqliteUserWriteRepository(this.writeDatabase)
    const userReadRepository = new MongoUserReadRepository(this.readDatabase)

    this.messageBus.registerCommandHandler(
      "RegisterUserCommand",
      new RegisterUserCommandHandler(userWriteRepository, this.messageBus)
    );

    this.messageBus.registerCommandHandler(
      "UpdateUserCommand",
      new UpdateUserCommandHandler(userWriteRepository, this.messageBus)
    );

    this.messageBus.registerQueryHandler(
      "FindUserByIdQuery",
      new FindUserQueryHandler(userReadRepository)
    );

    this.messageBus.registerQueryHandler(
      "GetAllUsersQuery",
      new GetAllUsersQueryHandler(userReadRepository)
    );

    this.messageBus.registerEventHandler(
      "UserRegisteredEvent",
    [new UserRegisteredEventHandler(userReadRepository)]
    );

    this.messageBus.registerEventHandler(
      "UserUpdatedEvent",
      [new UserUpdatedEventHandler(userReadRepository)]
    );
  }

  public async cleanup(): Promise<void> {
    console.log("Cleaning up resources...");

    await this.messageBus.drainEventQueue();

    await this.writeDatabase.close();
    await this.readDatabase.close();

    console.log("Cleanup completed.");
  }
}
