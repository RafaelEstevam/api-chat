const express = require("express");
const routes = express.Router();

import MessageController from './controller/MessageController';
import ConnectionController from './controller/ConnectionController';

routes.get('/connections/all', ConnectionController.GetAll);
routes.get('/connections/id/:userId', ConnectionController.GetConnectionsById);
routes.get('/connections/data/all', ConnectionController.GetDataConnections);
routes.get('/connections/data/id/:userId', ConnectionController.GetDataConnectionsById);

routes.get('/messages', MessageController.GetAll);
routes.get('/messages/data', MessageController.GetData);
routes.get('/messages/historic/:hashConnection', MessageController.GetHistoric);

routes.get('/', (req, res) =>{
    return res.send("Hello World")
});

module.exports = routes;