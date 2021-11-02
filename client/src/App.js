import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { ClientWebSocket } from './websocket/client';
import './App.css';
import { v4 as uuid } from 'uuid';

// let socket;
const clientWebSocket = new ClientWebSocket();

function App() {
  const [id, setId] = useState(1);
  const [name, setName] = useState('teste');
  const [email, setEmail] = useState('teste@teste.com');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [attendantMessage, setAttendantMessage] = useState({});
  const [dataClient, setDataClient] = useState({});
  const [hash_connection, setHashConnection] = useState('');

  const handleAccessClient = (clientId) => {

    const params = {
      userId: id,
      name,
      email,
      hashConnection: hash_connection
    }

    setDataClient(params);
    clientWebSocket.emit('access_client', params);

  }

  const handleSubmitMessage = () => {
    const messageToShow = {
      name,
      email,
      message,
      hashConnection: hash_connection,
      isAttendant: false,
      to: attendantMessage.from,
      from: clientWebSocket.id
    };

    setMessages([...messages, ...[messageToShow]]);

    clientWebSocket.emit('delivery_message_to_attendant', messageToShow);

  }

  const handleCloseChat = () => {
    clientWebSocket.emit('client_disconnect', clientWebSocket.id);
    clientWebSocket.close();
  }

  useEffect(() => {

    clientWebSocket.on('recieve_message_of_attendant', (params) => {
      setAttendantMessage(params);
    })

    if (sessionStorage.getItem('hash_connection')) {
      setHashConnection(sessionStorage.getItem('hash_connection'));
    } else {
      sessionStorage.setItem('hash_connection', uuid());
    }

  }, []);

  useEffect(() => {
    setMessages([...messages, ...[attendantMessage]]);
  }, [attendantMessage]);

  // useEffect(() => {
  //   if (hash_connection) {
  //     handleAccessClient(clientWebSocket.id);
  //   }
  // }, [hash_connection]);

  useEffect(() => {
    if (sessionStorage.getItem('hash_connection')) {
      setHashConnection(sessionStorage.getItem('hash_connection'));
    } else {
      sessionStorage.setItem('hash_connection', uuid());
      setHashConnection(sessionStorage.getItem('hash_connection'));
    }
  }, [])

  return (
    <div>
      <h1>Chat cliente</h1>
      <input value={id} onChange={(e) => setId(e.target.value)} />
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      {/* <button onClick={() => handleConnectChat()}>Conectar</button> */}
      <button onClick={() => handleAccessClient()}>Conectar</button>
      <button onClick={() => handleCloseChat()}>Encerrar atendimento</button>

      <br />
      <br />
      <br />
      <br />

      <div style={{ display: 'flex' }}>
        <div>
          <h3>Você está sendo atendido por:</h3>
          <p>{attendantMessage.name}</p>
          <p>{attendantMessage.email}</p>
        </div>
        <div>
          <div style={{ display: 'block', maxHeight: '600px', width: '400px', overflowX: 'hidden', overFlowY: 'auto', height: '400px', border: '1px solid #ddd' }}>
            {messages?.map((item) => (
              <div style={{ background: item.isAttendant && '#fc3' }}>
                <p>{item.message}</p>
                <small>{item.hour} - {item.name}</small>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <textarea rows="8" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Sua mensagem"></textarea>
            <button onClick={() => handleSubmitMessage()}>Enviar mensagem</button>
          </div>
        </div>
      </div>


    </div>
  );
}

export default App;
