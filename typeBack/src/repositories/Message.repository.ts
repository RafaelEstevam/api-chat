import {Repository, EntityRepository} from 'typeorm';
import {Message} from '../entities/Message.entity';

@EntityRepository(Message)
class MessageRepository extends Repository<Message>{}

export {MessageRepository};