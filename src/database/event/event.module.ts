import { Module } from "@nestjs/common";
import { databaseProviders } from "../database.provider";
import { EventRepository } from "./event.repository";
import { EventProvider } from "./event.provider";

@Module({
    providers: [
        ...databaseProviders,
        EventRepository,
        ...EventProvider,
    ],
    exports : [
        EventRepository,
        ...EventProvider,
    ]
  })
  export class EventModule {}