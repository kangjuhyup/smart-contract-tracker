import { Module } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { TrackerController } from './tracker.controller';
import { WebSocketModule } from '@root/websocket/websocket.module';

@Module({
    imports :[
        WebSocketModule,
    ],
  providers: [TrackerService],
  controllers: [TrackerController]
})
export class TrackerModule {}
