import {Request, Response} from 'express';
import {MessageService} from '../services/Message.service';

class MessageController{
    async create(request:Request, response:Response){
        const messageService = new MessageService();
        const {name, email, message, hash_connection, to, from, user_id} = request.body;

        try{
            const newMessage = await messageService.create({
                name,
                email,
                message,
                user_id,
                hash_connection,
                to,
                from
            });
            return response.json(newMessage);
        }catch(error){
            return response.status(400).json({message: error.message});
        }
    }

    async index(request: Request, response: Response){
        const messageService = new MessageService();
        const {hash_connection} = request.params;
        try{
            const messages = await messageService.index(hash_connection);
            return response.json(messages);
        }catch(error){
            return response.status(400).json({message: error.message});
        }
    }

}

export{MessageController}