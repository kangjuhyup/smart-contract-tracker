import { Injectable } from "@nestjs/common";
import { EventRepository } from "./event/event.repository";

@Injectable()
export class DatabaseFactory {
    constructor(
        private readonly _eventRepository : EventRepository
    ){}

    get userRepository() : EventRepository { return this._eventRepository };
}