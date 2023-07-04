import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { EventModule } from './event/event.module';

@Module({
    providers : [
        ...databaseProviders
    ],
    imports : [
        EventModule
    ],
    exports : [
        EventModule
    ]
})
export class DatabaseModule {}