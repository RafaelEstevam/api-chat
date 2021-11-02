import React, {useState, useEffect} from 'react';
import {AttendantWebSocket} from './websocket/attendant';

let attendantWebSocket = new AttendantWebSocket(); 

function App() {
  
  const [socketId, setSocketId] = useState('');
  const [name, setName] = useState('sara');
  const [email, setEmail] = useState('sara@sara.com');
  const [isOnline, setIsOnline] = useState(false);
  const [newClient, setNewClient] = useState([]);
  const [clientsInAttendance, setClientsInAttendance] = useState([]);
  const [rowOfAttendance, setRowOfAttendance] = useState([]);
  const [lastClientInAttendance, setLastClientInAttendance] = useState({});
  const [myAttendances, setMyAttendances] = useState([]);
  const [currentClientInAttendance, setCurrentClientInAttendance] = useState({});
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [clientMessage, setClientMessage] = useState('');
  const [clientDisconnected, setClientDisconnected] = useState('');
  const [onLineAttendantsList, setOnlineAttendantsList] = useState([]);
  const [newAttendantOnline, setNewAttendantOnline] = useState('');
  const [newAttendantOffline, setNewAttendantOffline] = useState('');
  const [deliveryAttendant, setDeliveryAttendant] = useState('');

  const handleGetOnline = () => {

    const attendant = {
      name, 
      email,
      from: attendantWebSocket.id
    };

    if(!isOnline){
      attendantWebSocket.on('connect');
      attendantWebSocket.emit('i_am_online', attendant);
      // setNewAttendantOnline(attendant);
      setIsOnline(true);
      setSocketId(attendantWebSocket.id);
    }else{
      attendantWebSocket.off('client_on_row');
      attendantWebSocket.emit('i_am_offline', attendant);
      setIsOnline(false);
    }
  }

  const handleCloseSession = () => {
    attendantWebSocket.close();
  }

  const handleGethMyClients = (params) => {
    setMyAttendances([...myAttendances, ...[params]]);
  }

  const handleGetClientToAttendance = (params) => {
    attendantWebSocket.emit('get_client', params);
    handleGethMyClients(params);
  }

  const handleTalk = (client) => {
    //TODO pegar histórico de conversas do cliente
    setCurrentClientInAttendance(client);
  }

  const handleSubmitMessage = (client) => {

    const messageToShow = {
      message,
      hour: '20:00',
      isAttendant: true,
      name,
      email,
      to: client.from,
      from: attendantWebSocket.id,
      user_id: '',
      hashConnection: client.hashConnection,
    };

    console.log(messageToShow);

    setMessages([...messages, ...[messageToShow]]);

    attendantWebSocket.emit('delivery_message_to_client', messageToShow);

  }

  const handleSubmitClientToAttendant = (client, newAttendant) => {

    const attendantToDeliveryClient = onLineAttendantsList.filter((item) => {
      return item.name === newAttendant;
    });

    const refreshMyAttendances = myAttendances.filter((item) => {
      return item.from !== client.from;
    });

    const attendant = attendantToDeliveryClient[0];

    const delivery = {
      client,
      attendant
    }

    if(attendant){
      attendantWebSocket.emit('delivery_to_attendant', (delivery))
    }

    setMyAttendances(refreshMyAttendances);
    setCurrentClientInAttendance({});
    setMessages([]);

  }

  useEffect(() => {

    attendantWebSocket.on('attendant_on_line', (params) => {
      setNewAttendantOnline(params);
    })

    attendantWebSocket.on('attendant_off_line', (params) => {
      setNewAttendantOffline(params);
    })

    if(isOnline){
      attendantWebSocket.on('client_on_row', (params) => { //atualiza os clientes que estão na fila para todos os atendentes
        setNewClient(params)
      });

      attendantWebSocket.on('client_get_out', (params) => {
        setClientDisconnected(params);
      });
    }
  }, [isOnline])

  useEffect(() => {
    attendantWebSocket.on('recieve_message_of_client', (params)=>{
      setClientMessage(params);
    })
  }, []);

  useEffect(() => {
    setMessages([...messages, ...[clientMessage]]);
  }, [clientMessage])

  useEffect(() => {
    setRowOfAttendance([...rowOfAttendance, ...[newClient]]); //adciona novo cliente na fila de atendimento;
  }, [newClient])

  useEffect(() => {
    attendantWebSocket.on('clients_in_attendance', (params) => { //atualiza o estado da fila 
      const clients = rowOfAttendance.filter((item) => {
        return item.from === params.from;
      });
      const client = clients[0];
      if(client){
        setLastClientInAttendance(params);
        setClientsInAttendance([...clientsInAttendance, ...[client]]);
        attendantWebSocket.emit('refresh_list_of_attendance', (params)); //atualiza a lista de atendimento de todos os atendentes
      };
    });
  }, [rowOfAttendance]);

  useEffect(() => {
    attendantWebSocket.on('refresh_row_of_attendance', (params) => { //recarrega a lista de atendimento disponível dos atendentes
      const refreshRowOfAttendance = rowOfAttendance.filter((item) => {
        return item.from !== params.from;
      });
      setRowOfAttendance(refreshRowOfAttendance);
    })
  }, [lastClientInAttendance]);

  useEffect(() => {
    const reloadRowOfAttendance = rowOfAttendance.filter((item) => {
      return item.from !== clientDisconnected.from;
    });

    const reloadClientsInAttendance = clientsInAttendance.filter((item) => {
      return item.from !== clientDisconnected.from;
    });

    const reloadMyAttendances = myAttendances.filter((item) => {
      return item.from !== clientDisconnected.from;
    });

    setRowOfAttendance(reloadRowOfAttendance);
    setClientsInAttendance(reloadClientsInAttendance);
    setMyAttendances(reloadMyAttendances);
    setMessages([]);
    setCurrentClientInAttendance({});
    
  }, [clientDisconnected]);

  useEffect(() => {
    setOnlineAttendantsList([...onLineAttendantsList, ...[newAttendantOnline]]);
  }, [newAttendantOnline])

  useEffect(() => {
    attendantWebSocket.on('attendant_off_line', (params) => {
      const attendantsOnline = onLineAttendantsList.filter((item) => {
        return item.from !== params.from;
      });
      setOnlineAttendantsList(attendantsOnline);
    })
  }, [onLineAttendantsList]);

  useEffect(() => {
    attendantWebSocket.on('recieve_client', (params) => {
      console.log(myAttendances)
      setMyAttendances([...myAttendances, ...[params.client]])
    });
  }, [myAttendances])

  return (
    <div>
      <h1>Chat atendente</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={() => handleGetOnline()}>{`Ficar ${isOnline ? 'Offline' : 'Online'}`}</button>
      <button onClick={() => handleCloseSession()}>Encerrar atendimento</button>
      {/* <button onClick={() => handleGetOnline()}>Atualizar fila</button> */}
      <div style={{display: 'flex'}}>
        <div>
          <h3>Fila</h3>
          <ul>
            {rowOfAttendance?.map((item) => (
              <li key={item.from}>
                <p>{item.name}</p>
                <p>{item.email}</p>
                <button onClick={() => handleGetClientToAttendance(item)}>Atender</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Em atendimento</h3>
          <ul>
            {clientsInAttendance?.map((item) => (
              <li key={item.from}>
                <p>{item.name}</p>
                <p>{item.email}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Meus atendimentos</h3>
          <ul>
            {myAttendances?.map((item) => (
              <li key={item.from}>
                <p>{item.name}</p>
                <p>{item.email}</p>
                <button onClick={() => handleTalk(item)}>Conversar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{display: 'flex'}}>
        <div style={{display: 'flex'}}>
          <div>
            <h3>Você está atendendo :</h3>
            <p>{currentClientInAttendance.name}</p>
            <p>{currentClientInAttendance.email}</p>
          </div>
          <div>
            <div style={{display: 'block', maxHeight: '600px', width: '400px', overflowX: 'hidden', overFlowY: 'auto', height:'400px', border: '1px solid #ddd'}}>
              {messages?.map((item) => (
                <div style={{background: item.isAttendant && '#fc3'}}>
                  <p>{item.message}</p>
                  <small>{item.hour}</small>
                </div>
              ))}
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <select value={deliveryAttendant.name} onChange={(e) => setDeliveryAttendant(e.target.value)}>
                <option>Encaminhar conversa atual:</option>
                {onLineAttendantsList?.map((item) => (
                  <>
                    {item.name !== name &&
                      <option value={item.name}>{item.name}</option>
                    }
                  </>
                ))}
              </select>
              <button onClick={() => handleSubmitClientToAttendant(currentClientInAttendance, deliveryAttendant )}>Encaminhar atendimento</button>
              <textarea rows="8" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Sua mensagem"></textarea>
              <button onClick={() => handleSubmitMessage(currentClientInAttendance)}>Enviar mensagem</button>
            </div>
          </div>
        </div>
        <div>
          <h3>Atendentes online</h3>
          <ul>
            {onLineAttendantsList?.map((item) => (
              <li key={item.from}>
                <p>{item.name}</p>
                <p>{item.email}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
    </div>
  );
}

export default App;
