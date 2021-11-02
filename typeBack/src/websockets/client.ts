import {io} from '../http';
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

io.on('connect', (socket) => {
    socket.on('access_client', (params) => {
        io.emit('client_on_row', params);
    });

    socket.on('delivery_message_to_attendant', (params) => {
        saveClientMessage(params);
        io.to(params.to).emit('recieve_message_of_attendant', params);
    });

    socket.on('client_disconnect', (params) => {
        io.emit('client_get_out', (params));
        socket.on('disconnect', () => {
            console.log("Cliente se desconectou", socket.id)
        })
    })
   
});