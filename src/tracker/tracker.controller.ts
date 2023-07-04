import { Controller, Get } from '@nestjs/common';
import { WebsocketService } from '@root/websocket/websocket.service';
import { TrackerService } from './tracker.service';

@Controller('tracker')
export class TrackerController {

    constructor(
        private readonly websocketService: WebsocketService,
        private readonly trackerService: TrackerService,
    ) {}
    
    @Get('provider')
    getProvider() {
        return this.websocketService.getProvider();
    }    

    @Get('start-tracking')
    startTracking() {
        return this.websocketService.startTracking();
    }
}
