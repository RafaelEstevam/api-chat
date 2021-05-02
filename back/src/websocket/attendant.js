import {io} from '../http';

io.on('connect', (socket) => {
    
    socket.on("access_attendant", (params) => {
        console.log('Atendente se conectou');
    })

    socket.on("get_client", (params) => {
        io.emit("clients_in_attendance", params);
    })

    socket.on("refresh_list_of_attendance", (params) => {
        io.emit("refresh_row_of_attendance", params);
    })

    socket.on("delivery_message_to_attendant", (params) => {
        io.to(params.to).emit('recieve_message_of_client', params)
    })
    
})