import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class EventEntity {
    @PrimaryColumn()
    transactoinHash : string;

    @Column()
    eventName : string;

    @Column()
    eventArgs : Object;

    
    constructor(
    ) {
        
    } 
} 