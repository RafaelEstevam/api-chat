import {http} from './http';
import './websockets/client';
import './websockets/attendant';

http.listen(3000, () => {
    console.log('Servidor de pé');
})