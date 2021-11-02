import {Router} from 'express';

import {UserController} from './controllers/User.controller';
import {MessageController} from './controllers/Message.controller';

const routes = Router();

const userController = new UserController();
const messageController = new MessageController();

routes.post('/users/new', userController.create, () => {});
routes.get('/users/:email', userController.storeByEmail, () => {});
routes.get('/users/user/:id', userController.store, () => {});

routes.post('/messages/new', messageController.create, () => {});
routes.get('/messages/:hash_connection', messageController.index, () => {});

export {routes};

