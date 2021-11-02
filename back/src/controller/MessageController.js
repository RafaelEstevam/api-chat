import MessageService from "../services/MessageService";

const GetAll = async(req, res, body) => {
    const Messages = await MessageService.GetAll();
    return res.json(Messages).send();
}

const GetData = async(req, res, body) => {
    const Messages = await MessageService.GetData();
    return res.json(Messages).send();
}

const GetHistoric = async(req, res, body) => {
    const {hashConnection} = req.params;
    const Messages = await MessageService.GetHistoric(hashConnection);
    return res.json(Messages).send();
}

export default {
    GetAll,
    GetData,
    GetHistoric
}