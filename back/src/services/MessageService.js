import Message from '../model/Message';

const PostMessage = async (bodyMessage) => {

    const { message, isAttendant, name, email, to, from, hashConnection } = bodyMessage;

    const newMessage = Message.create({
        message,
        isAttendant,
        name,
        email,
        to,
        from,
        hashConnection
    });

    await Message.save(newMessage);
}

const GetAll = async () => {
    const Messages = await Message.find();
    return Messages;
}

const GetHistoric = async (hashConnection) => {
    const Messages = await Message.find({"hashConnection": hashConnection});
    return Messages;
}

const GetData = async () => {
    const SearchAll = await Message.find();
    const data = {
        count: SearchAll.length
    };

    return data;
}

export default {
    PostMessage,
    GetAll,
    GetData,
    GetHistoric
}