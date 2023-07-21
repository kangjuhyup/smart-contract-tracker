import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TrackerModule } from '@root/tracker/tracker.module';

@Module({
    imports: [
        TrackerModule,
    ],
    providers: [
        AdminService,
    ],
    controllers: [
        AdminController
    ]
})
export class AdminModule { }
