import Connection from '../model/Connection';

const minutesAtYear = 525600;

function calcMetrics (Connections){
    const totalConnections = Connections.length || 0;
    let totalMinutesOnline = 0;
   
    Connections?.map((connection) => {

        if(connection.disconnect){
            const startDate = new Date(connection.createdAt);
            const endDate = new Date(connection.disconnect);

            const finishDate = new Date(endDate - startDate);
            const finishDateSecond = finishDate.getSeconds();
            const finishDateMinutes = finishDate.getMinutes();
            const finishDateHours = finishDate.getUTCHours();

            totalMinutesOnline += finishDateMinutes;

            connection = {connection, ...{finishDateSecond, finishDateMinutes, finishDateHours}}
        }
        
        return connection;
    });

    return {totalConnections, totalMinutesOnline}
}

const PostConnection = async (connection) => {

    const { userId, name, email, hashConnection, from } = connection;

    const newConnection = Connection.create({
        userId,
        name,
        email,
        hashConnection,
        from,
        disconnect: null,
    });

    await Connection.save(newConnection);
}

const GetAll = async () => {
    const Connections = await Connection.find();
    return Connections;
}

const GetConnectionsById = async (userId) => {
    const Connections = await Connection.find({"userId": userId});
    return Connections;
}

const UpdateConnection = async (from) => {
    const disconnectDate = new Date();
    await Connection.updateOne({"from": from}, {"disconnect": disconnectDate});
}

const GetDataConnections = async () => {
    const Connections = await Connection.find();

    const {totalMinutesOnline, totalConnections} = calcMetrics(Connections);

    const Data = {
        period: 'year',
        totalAverageMinutesOnline: totalConnections ? totalMinutesOnline / totalConnections : 0,
        totalConnections,
        totalMinutesOnline,
        totalEngagement: totalMinutesOnline / minutesAtYear
    }

    return Data;
}

const GetDataConnectionsById = async (userId) => {
    const Connections = await Connection.find({"userId": userId});

    const {totalMinutesOnline, totalConnections} = calcMetrics(Connections);

    const Data = {
        averageMinutesOnline: totalConnections ? totalMinutesOnline / totalConnections : 0,
        period: 'year',
        totalConnections,
        totalMinutesOnline,
        engagement: totalMinutesOnline / minutesAtYear,
        userId
    }

    return Data;
}

export default {
    PostConnection,
    GetAll,
    GetConnectionsById,
    GetDataConnections,
    GetDataConnectionsById,
    UpdateConnection
}