import {Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne} from 'typeorm';
import {v4 as uuid} from 'uuid';
import { User } from './User.entity'

@Entity('connections')
class Connection{

    @PrimaryColumn()
    id: string;

    @Column()
    admin_id: string;

    @JoinColumn({name: 'user_id'})
    @ManyToOne(() => User)
    user: User;

    @Column()
    user_id: string;

    @Column()
    hash_connection: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }

}

export {Connection}