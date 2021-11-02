import {http} from './http';
import './websocket/client';
import './websocket/attendant';

http.listen(3000, () => {
    console.log("Servidor de pé.");
});