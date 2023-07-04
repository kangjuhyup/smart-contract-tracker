import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class EventEntity {
    @PrimaryColumn()
    uuid : string;

    @Column()
    address : string;

    
    constructor(
        _uuid : string,
        _address : string,
        
    ) {
        this.address = _address;
        this.uuid = _uuid;
        
    } 
} 