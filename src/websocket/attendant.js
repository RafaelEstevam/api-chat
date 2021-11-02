import io from 'socket.io-client';

const WS = 'http://localhost:3000'

class AttendantWebSocket {

    socket;
    client;

    constructor(){
        this.socket = io(WS);
        this.socket.on('connect', () => {console.log('Atendente conectado')});
        return this.socket;
    }
    
}

export {AttendantWebSocket}