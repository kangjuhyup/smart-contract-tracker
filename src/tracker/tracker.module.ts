import { Module } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { TrackerController } from './tracker.controller';

@Module({
    imports :[
    ],
  providers: [TrackerService],
  controllers: [TrackerController]
})
export class TrackerModule {}
