import MessageService from '../services/MessageService';
import ConnectionService from '../services/ConnectionService';

import {io} from '../http';

io.on('connect', (socket) => {

    socket.on('access_client', (params) => {
        params.from = socket.id;
        ConnectionService.PostConnection(params);
        io.emit('client_on_row', params);
    });

    socket.on('delivery_message_to_client', (params) => {
        MessageService.PostMessage(params);
        io.to(params.to).emit('recieve_message_of_attendant', params);
    });

    socket.on('client_disconnect', (params) => {

        ConnectionService.UpdateConnection(params);

        io.emit('client_get_out', (params));

        socket.on('disconnect', () => {
            console.log("Cliente se desconectou", socket.id)
        })
    })
   
});