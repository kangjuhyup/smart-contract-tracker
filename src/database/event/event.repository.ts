import { Inject, Injectable } from '@nestjs/common';
import { EventEntity } from '@root/database/event/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventRepository {
  constructor(
    @Inject('EVENT_REPOSITORY') private repository: Repository<EventEntity>,
  ) {}

  upsert(event: EventEntity): Promise<EventEntity> {
    return this.repository.save(event).catch((err) => {
      throw err;
    });
  }

  findOne(): Promise<EventEntity> {
    return this.repository.findOne({
      where: {
        
      },
    });
  }
}