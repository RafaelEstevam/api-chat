import io from 'socket.io-client';
const WS = 'http://localhost:3000'

class ClientWebSocket {
    socket;
    
    constructor(){
        this.socket = io(WS);
        this.socket.on('connect', () => {
            console.log('conectou');
        })
        return this.socket;
    }

}

export {ClientWebSocket};