import ConnectionService from "../services/ConnectionService";

const GetAll = async(req, res, body) => {
    const Connections = await ConnectionService.GetAll();
    return res.json(Connections).send();
}

const GetDataConnections = async(req, res, body) => {
    const Connections = await ConnectionService.GetDataConnections();
    return res.json(Connections).send();
}

const GetConnectionsById = async(req, res, body) => {
    const {userId} = req.params;
    const Connections = await ConnectionService.GetConnectionsById(userId);
    return res.json(Connections).send();
}

const GetDataConnectionsById = async(req, res, body) => {
    const {userId} = req.params;
    const Connections = await ConnectionService.GetDataConnectionsById(userId);
    return res.json(Connections).send();
}

export default {
    GetAll,
    GetConnectionsById,
    GetDataConnectionsById,
    GetDataConnections
}