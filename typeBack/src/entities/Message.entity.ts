import {Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne} from 'typeorm';
import {v4 as uuid} from 'uuid';
import { User } from './User.entity';

@Entity('messages')
class Message{

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    message: string;

    @JoinColumn({name: 'user_id'}) //relacionamento com a tabela de usuário
    @ManyToOne(()=> User) //com a coluna hash_connection
    user: User; //Um usuário pode ter muitas mensagens

    @Column()
    user_id: string;

    @Column()
    hash_connection: string;

    @Column()
    to: string;

    @Column()
    from: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }

}

export {Message}