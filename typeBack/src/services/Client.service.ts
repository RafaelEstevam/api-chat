import {MessageService} from '../services/Message.service';

async function saveClientMessage(params){
    const {name, email, message, user_id, hash_connection, from, to} = params;
    const messageService = new MessageService();

    try{
        await messageService.create({
            name,
            email,
            message,
            user_id,
            hash_connection,
            from,
            to
        });

    }catch(error){
        return error;
    }
}

export {saveClientMessage};